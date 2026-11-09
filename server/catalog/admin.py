from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Category,
    Product,
    ProductImage,
    ProductBenefit,
    ProductFAQ,
    ImageOptimizationSettings,
)


# =========================================================
# INLINE: PRODUCT IMAGES
# =========================================================

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0

    fields = (
        "preview",
        "image",
        "alt_text",
        "order",
    )

    readonly_fields = (
        "preview",
    )

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:90px;height:70px;'
                'object-fit:contain;background:#111;'
                'border-radius:8px;padding:4px;" />',
                obj.image.url,
            )

        return "—"

    preview.short_description = "Preview"


# =========================================================
# INLINE: BENEFITS
# =========================================================

class ProductBenefitInline(admin.TabularInline):
    model = ProductBenefit
    extra = 0

    fields = (
        "text",
        "order",
    )


# =========================================================
# INLINE: FAQ
# =========================================================

class ProductFAQInline(admin.StackedInline):
    model = ProductFAQ
    extra = 0

    fields = (
        "question",
        "answer",
        "order",
    )


# =========================================================
# CATEGORIES
# =========================================================

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "product_type",
        "order",
        "is_active",
    )

    list_editable = (
        "order",
        "is_active",
    )

    list_filter = (
        "product_type",
        "is_active",
    )

    search_fields = (
        "name",
        "slug",
    )

    prepopulated_fields = {
        "slug": (
            "name",
        ),
    }

    ordering = (
        "order",
        "name",
    )

    fieldsets = (
        (
            "Category",
            {
                "fields": (
                    "name",
                    "slug",
                    "product_type",
                ),
            },
        ),
        (
            "Display",
            {
                "fields": (
                    "order",
                    "is_active",
                ),
            },
        ),
    )


# =========================================================
# PRODUCTS
# =========================================================

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "hero_preview",
        "title",
        "category",
        "is_published",
        "order",
        "updated_at",
    )

    list_display_links = (
        "hero_preview",
        "title",
    )

    list_editable = (
        "is_published",
        "order",
    )

    list_filter = (
        "category__product_type",
        "category",
        "is_published",
    )

    search_fields = (
        "title",
        "slug",
        "short_description",
        "description",
    )

    prepopulated_fields = {
        "slug": (
            "title",
        ),
    }

    readonly_fields = (
        "hero_preview_large",
        "created_at",
        "updated_at",
    )

    ordering = (
        "category",
        "order",
        "title",
    )

    save_on_top = True

    inlines = [
        ProductImageInline,
        ProductBenefitInline,
        ProductFAQInline,
    ]

    fieldsets = (
        (
            "Product",
            {
                "fields": (
                    "category",
                    "title",
                    "slug",
                ),
            },
        ),
        (
            "Content",
            {
                "fields": (
                    "short_description",
                    "description",
                ),
            },
        ),
        (
            "Main Image",
            {
                "fields": (
                    "hero_preview_large",
                    "hero_image",
                ),
                "description": (
                    "Upload a PNG, JPG, JPEG or WebP image. "
                    "The website automatically optimizes it."
                ),
            },
        ),
        (
            "Display Settings",
            {
                "fields": (
                    "order",
                    "is_published",
                ),
            },
        ),
        (
            "System Information",
            {
                "classes": (
                    "collapse",
                ),
                "fields": (
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    def hero_preview(
        self,
        obj,
    ):
        if obj.hero_image:
            return format_html(
                '<img src="{}" style="width:65px;height:50px;'
                'object-fit:contain;background:#111;'
                'border-radius:7px;padding:3px;" />',
                obj.hero_image.url,
            )

        return "—"

    hero_preview.short_description = "Image"

    def hero_preview_large(
        self,
        obj,
    ):
        if obj.hero_image:
            return format_html(
                '<img src="{}" style="max-width:320px;'
                'max-height:240px;object-fit:contain;'
                'background:#111;border-radius:12px;'
                'padding:10px;" />',
                obj.hero_image.url,
            )

        return "No image uploaded"

    hero_preview_large.short_description = (
        "Current Image"
    )


# =========================================================
# IMAGE QUALITY
# SUPERUSER ONLY
# =========================================================

@admin.register(ImageOptimizationSettings)
class ImageOptimizationSettingsAdmin(
    admin.ModelAdmin
):
    readonly_fields = (
        "updated_at",
    )

    fieldsets = (
        (
            "Image Quality",
            {
                "fields": (
                    "quality",
                ),
                "description": (
                    "Controls WebP quality for new image uploads. "
                    "Recommended value: 84. "
                    "Higher quality increases file size."
                ),
            },
        ),
        (
            "System Information",
            {
                "classes": (
                    "collapse",
                ),
                "fields": (
                    "updated_at",
                ),
            },
        ),
    )

    def has_module_permission(
        self,
        request,
    ):
        return request.user.is_superuser

    def has_view_permission(
        self,
        request,
        obj=None,
    ):
        return request.user.is_superuser

    def has_change_permission(
        self,
        request,
        obj=None,
    ):
        return request.user.is_superuser

    def has_add_permission(
        self,
        request,
    ):
        return (
            request.user.is_superuser
            and not ImageOptimizationSettings.objects.exists()
        )

    def has_delete_permission(
        self,
        request,
        obj=None,
    ):
        return False


# =========================================================
# ADMIN BRANDING
# =========================================================

admin.site.site_header = (
    "INCO Windows & Doors"
)

admin.site.site_title = (
    "INCO Admin"
)

admin.site.index_title = (
    "Website Administration"
)