from django.core.validators import (
    MaxValueValidator,
    MinValueValidator,
)
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver

from .image_utils import optimize_uploaded_image


# =========================================================
# IMAGE QUALITY SETTINGS
# =========================================================


class ImageOptimizationSettings(models.Model):
    quality = models.PositiveSmallIntegerField(
        default=84,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(100),
        ],
        help_text=(
            "WebP image quality. Recommended: 80-90."
        ),
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        verbose_name = "Image Quality"
        verbose_name_plural = "Image Quality"

    def __str__(self):
        return f"Image Quality: {self.quality}"

    def save(self, *args, **kwargs):
        # Only one settings object can exist.
        self.pk = 1

        super().save(
            *args,
            **kwargs,
        )

    @classmethod
    def load(cls):
        settings_object, _ = cls.objects.get_or_create(
            pk=1,
            defaults={
                "quality": 84,
            },
        )

        return settings_object


# =========================================================
# CATEGORY
# =========================================================


class Category(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ("window", "Window"),
        ("door", "Door"),
    ]

    name = models.CharField(
        max_length=120,
    )

    slug = models.SlugField(
        max_length=120,
        unique=True,
    )

    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES,
    )

    order = models.PositiveIntegerField(
        default=0,
    )

    is_active = models.BooleanField(
        default=True,
    )

    class Meta:
        ordering = [
            "order",
            "name",
        ]

        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


# =========================================================
# PRODUCT
# =========================================================


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    title = models.CharField(
        max_length=200,
    )

    slug = models.SlugField(
        max_length=200,
        unique=True,
    )

    short_description = models.TextField()

    description = models.TextField()

    hero_image = models.ImageField(
        upload_to="catalog/products/",
        blank=True,
        null=True,
    )

    order = models.PositiveIntegerField(
        default=0,
    )

    is_published = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        ordering = [
            "order",
            "title",
        ]

    def save(self, *args, **kwargs):
        old_image_name = None

        if self.pk:
            old_image_name = (
                Product.objects
                .filter(pk=self.pk)
                .values_list(
                    "hero_image",
                    flat=True,
                )
                .first()
            )

        new_image_uploaded = bool(
            self.hero_image
            and not self.hero_image._committed
        )

        if new_image_uploaded:
            image_settings = (
                ImageOptimizationSettings.load()
            )

            self.hero_image = (
                optimize_uploaded_image(
                    self.hero_image,
                    quality=image_settings.quality,
                )
            )

        super().save(
            *args,
            **kwargs,
        )

        new_image_name = (
            self.hero_image.name
            if self.hero_image
            else None
        )

        # Delete old file after replacement.
        if (
            old_image_name
            and old_image_name != new_image_name
        ):
            storage = (
                self._meta
                .get_field("hero_image")
                .storage
            )

            if storage.exists(
                old_image_name
            ):
                storage.delete(
                    old_image_name
                )

    def __str__(self):
        return self.title


# =========================================================
# PRODUCT IMAGE
# =========================================================


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="gallery",
    )

    image = models.ImageField(
        upload_to="catalog/gallery/",
    )

    alt_text = models.CharField(
        max_length=255,
        blank=True,
    )

    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        ordering = [
            "order",
            "id",
        ]

    def save(self, *args, **kwargs):
        old_image_name = None

        if self.pk:
            old_image_name = (
                ProductImage.objects
                .filter(pk=self.pk)
                .values_list(
                    "image",
                    flat=True,
                )
                .first()
            )

        new_image_uploaded = bool(
            self.image
            and not self.image._committed
        )

        if new_image_uploaded:
            image_settings = (
                ImageOptimizationSettings.load()
            )

            self.image = (
                optimize_uploaded_image(
                    self.image,
                    quality=image_settings.quality,
                )
            )

        super().save(
            *args,
            **kwargs,
        )

        new_image_name = (
            self.image.name
            if self.image
            else None
        )

        if (
            old_image_name
            and old_image_name != new_image_name
        ):
            storage = (
                self._meta
                .get_field("image")
                .storage
            )

            if storage.exists(
                old_image_name
            ):
                storage.delete(
                    old_image_name
                )

    def __str__(self):
        return f"{self.product.title} image"


# =========================================================
# PRODUCT BENEFIT
# =========================================================


class ProductBenefit(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="benefits",
    )

    text = models.CharField(
        max_length=255,
    )

    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        ordering = [
            "order",
            "id",
        ]

    def __str__(self):
        return self.text


# =========================================================
# PRODUCT FAQ
# =========================================================


class ProductFAQ(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="faqs",
    )

    question = models.CharField(
        max_length=255,
    )

    answer = models.TextField()

    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        ordering = [
            "order",
            "id",
        ]

    def __str__(self):
        return self.question


# =========================================================
# FILE CLEANUP
# =========================================================


@receiver(
    post_delete,
    sender=Product,
)
def delete_product_hero_file(
    sender,
    instance,
    **kwargs,
):
    if instance.hero_image:
        storage = instance.hero_image.storage
        name = instance.hero_image.name

        if (
            name
            and storage.exists(name)
        ):
            storage.delete(name)


@receiver(
    post_delete,
    sender=ProductImage,
)
def delete_gallery_image_file(
    sender,
    instance,
    **kwargs,
):
    if instance.image:
        storage = instance.image.storage
        name = instance.image.name

        if (
            name
            and storage.exists(name)
        ):
            storage.delete(name)