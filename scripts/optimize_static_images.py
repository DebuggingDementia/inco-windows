from pathlib import Path
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = ROOT / "public" / "images"

MAX_WIDTH = 1600
MAX_HEIGHT = 1600
QUALITY = 84

SUPPORTED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
}


def optimize_image(source_path: Path):
    destination_path = source_path.with_suffix(".webp")

    if destination_path.exists():
        if (
            destination_path.stat().st_mtime
            >= source_path.stat().st_mtime
        ):
            print(
                f"SKIP: {source_path.relative_to(ROOT)}"
            )
            return

    try:
        with Image.open(source_path) as source:
            image = ImageOps.exif_transpose(source)
            image.load()

            has_transparency = (
                image.mode in ("RGBA", "LA")
                or (
                    image.mode == "P"
                    and "transparency" in image.info
                )
            )

            if has_transparency:
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

            image.thumbnail(
                (
                    MAX_WIDTH,
                    MAX_HEIGHT,
                ),
                Image.Resampling.LANCZOS,
            )

            save_options = {
                "format": "WEBP",
                "quality": QUALITY,
                "method": 6,
            }

            if has_transparency:
                save_options["alpha_quality"] = 100

            image.save(
                destination_path,
                **save_options,
            )

        before = source_path.stat().st_size
        after = destination_path.stat().st_size

        reduction = (
            (before - after) / before * 100
            if before
            else 0
        )

        print(
            f"OK: {source_path.relative_to(ROOT)}\n"
            f"    {before / 1024:.1f} KB"
            f" -> {after / 1024:.1f} KB"
            f" ({reduction:.1f}% smaller)"
        )

    except Exception as exc:
        print(
            f"FAILED: {source_path}: {exc}"
        )


def main():
    print()
    print("Optimizing static frontend images...")
    print()

    files = [
        file
        for file in IMAGES_DIR.rglob("*")
        if (
            file.is_file()
            and file.suffix.lower()
            in SUPPORTED_EXTENSIONS
        )
    ]

    print(f"Found {len(files)} images.")
    print()

    for file in files:
        optimize_image(file)

    print()
    print("Done.")


if __name__ == "__main__":
    main()