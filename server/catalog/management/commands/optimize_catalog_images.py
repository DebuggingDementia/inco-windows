from pathlib import Path

from django.core.management.base import BaseCommand

from catalog.image_utils import optimize_uploaded_image
from catalog.models import (
    ImageOptimizationSettings,
    Product,
    ProductImage,
)


class Command(BaseCommand):
    help = (
        "Convert existing catalog images to optimized WebP files."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help=(
                "Show which images would be optimized "
                "without changing files."
            ),
        )

        parser.add_argument(
            "--force",
            action="store_true",
            help=(
                "Also re-optimize existing WebP images."
            ),
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        force = options["force"]

        settings = ImageOptimizationSettings.load()
        quality = settings.quality

        self.stdout.write("")
        self.stdout.write(
            self.style.MIGRATE_HEADING(
                "INCO Catalog Image Optimization"
            )
        )

        self.stdout.write(
            f"WebP quality: {quality}"
        )

        if dry_run:
            self.stdout.write(
                self.style.WARNING(
                    "DRY RUN — no files will be changed."
                )
            )

        self.stdout.write("")

        stats = {
            "processed": 0,
            "skipped": 0,
            "failed": 0,
            "before": 0,
            "after": 0,
        }

        # =================================================
        # PRODUCT HERO IMAGES
        # =================================================

        for product in Product.objects.all():
            if not product.hero_image:
                continue

            self.optimize_field(
                instance=product,
                field_name="hero_image",
                model=Product,
                quality=quality,
                dry_run=dry_run,
                force=force,
                stats=stats,
            )

        # =================================================
        # PRODUCT GALLERY IMAGES
        # =================================================

        for product_image in ProductImage.objects.all():
            if not product_image.image:
                continue

            self.optimize_field(
                instance=product_image,
                field_name="image",
                model=ProductImage,
                quality=quality,
                dry_run=dry_run,
                force=force,
                stats=stats,
            )

        self.stdout.write("")
        self.stdout.write(
            self.style.MIGRATE_HEADING(
                "Optimization complete"
            )
        )

        self.stdout.write(
            f"Processed: {stats['processed']}"
        )

        self.stdout.write(
            f"Skipped:   {stats['skipped']}"
        )

        self.stdout.write(
            f"Failed:    {stats['failed']}"
        )

        if not dry_run:
            before_mb = (
                stats["before"]
                / 1024
                / 1024
            )

            after_mb = (
                stats["after"]
                / 1024
                / 1024
            )

            saved_mb = (
                stats["before"]
                - stats["after"]
            ) / 1024 / 1024

            if stats["before"]:
                reduction = (
                    (
                        stats["before"]
                        - stats["after"]
                    )
                    / stats["before"]
                    * 100
                )
            else:
                reduction = 0

            self.stdout.write("")
            self.stdout.write(
                f"Before: {before_mb:.2f} MB"
            )

            self.stdout.write(
                f"After:  {after_mb:.2f} MB"
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f"Saved:  {saved_mb:.2f} MB "
                    f"({reduction:.1f}%)"
                )
            )

    def optimize_field(
        self,
        *,
        instance,
        field_name,
        model,
        quality,
        dry_run,
        force,
        stats,
    ):
        field = getattr(
            instance,
            field_name,
        )

        old_name = field.name

        if not old_name:
            return

        suffix = (
            Path(old_name)
            .suffix
            .lower()
        )

        # Existing WebP files are already optimized.
        # Use --force if quality was changed and you
        # intentionally want to recompress them.
        if suffix == ".webp" and not force:
            stats["skipped"] += 1

            self.stdout.write(
                f"SKIP: {old_name}"
            )

            return

        storage = field.storage

        if not storage.exists(old_name):
            stats["failed"] += 1

            self.stderr.write(
                self.style.ERROR(
                    f"MISSING: {old_name}"
                )
            )

            return

        if dry_run:
            stats["processed"] += 1

            self.stdout.write(
                self.style.WARNING(
                    f"WOULD OPTIMIZE: {old_name}"
                )
            )

            return

        try:
            old_size = storage.size(
                old_name
            )

            with storage.open(
                old_name,
                "rb",
            ) as source:
                source.name = Path(
                    old_name
                ).name

                optimized_file = (
                    optimize_uploaded_image(
                        source,
                        quality=quality,
                    )
                )

            directory = Path(
                old_name
            ).parent

            target_name = (
                directory
                / (
                    f"{Path(old_name).stem}"
                    ".webp"
                )
            )

            new_name = storage.save(
                str(target_name),
                optimized_file,
            )

            new_size = storage.size(
                new_name
            )

            # Update DB directly so Product.save()
            # does not optimize the file a second time.
            model.objects.filter(
                pk=instance.pk
            ).update(
                **{
                    field_name: new_name,
                }
            )

            # Only delete old file after the new file
            # and DB reference were saved successfully.
            if (
                old_name
                and old_name != new_name
                and storage.exists(old_name)
            ):
                storage.delete(
                    old_name
                )

            stats["processed"] += 1
            stats["before"] += old_size
            stats["after"] += new_size

            old_kb = old_size / 1024
            new_kb = new_size / 1024

            self.stdout.write(
                self.style.SUCCESS(
                    f"OK: {old_name}"
                    f" -> {new_name}"
                    f" | {old_kb:.1f} KB"
                    f" -> {new_kb:.1f} KB"
                )
            )

        except Exception as exc:
            stats["failed"] += 1

            self.stderr.write(
                self.style.ERROR(
                    f"FAILED: {old_name}"
                    f" | {exc}"
                )
            )