from io import BytesIO
from pathlib import Path

from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from PIL import Image, ImageOps, UnidentifiedImageError


# =========================================================
# IMAGE OPTIMIZATION DEFAULTS
# =========================================================

MAX_IMAGE_WIDTH = 1600
MAX_IMAGE_HEIGHT = 1600
DEFAULT_IMAGE_QUALITY = 84


def optimize_uploaded_image(
    uploaded_file,
    *,
    quality=DEFAULT_IMAGE_QUALITY,
):
    """
    Automatically prepare uploaded images for the website.

    - Converts PNG / JPG / JPEG / WebP -> WebP
    - Preserves transparency
    - Corrects EXIF orientation
    - Keeps aspect ratio
    - Never enlarges smaller images
    - Limits image size to 1600 x 1600
    """

    try:
        quality = max(
            1,
            min(int(quality), 100),
        )

        uploaded_file.seek(0)

        with Image.open(uploaded_file) as source:
            image = ImageOps.exif_transpose(source)

            # Load image before source file closes
            image.load()

            has_transparency = (
                image.mode in (
                    "RGBA",
                    "LA",
                )
                or (
                    image.mode == "P"
                    and "transparency" in image.info
                )
            )

            if has_transparency:
                image = image.convert("RGBA")
            else:
                image = image.convert("RGB")

            # Preserve aspect ratio.
            # Smaller images are NOT enlarged.
            image.thumbnail(
                (
                    MAX_IMAGE_WIDTH,
                    MAX_IMAGE_HEIGHT,
                ),
                Image.Resampling.LANCZOS,
            )

            output = BytesIO()

            save_options = {
                "format": "WEBP",
                "quality": quality,
                "method": 6,
            }

            if has_transparency:
                save_options["alpha_quality"] = 100

            image.save(
                output,
                **save_options,
            )

            output.seek(0)

            original_name = getattr(
                uploaded_file,
                "name",
                "image",
            )

            filename = Path(
                original_name
            ).stem

            return ContentFile(
                output.read(),
                name=f"{filename}.webp",
            )

    except (
        UnidentifiedImageError,
        OSError,
        ValueError,
    ) as exc:
        raise ValidationError(
            "The uploaded file is not a valid image."
        ) from exc