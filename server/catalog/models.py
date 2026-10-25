from django.db import models


class Category(models.Model):
    PRODUCT_TYPE_CHOICES = [
        ("window", "Window"),
        ("door", "Door"),
    ]

    name = models.CharField(max_length=120)

    slug = models.SlugField(
        max_length=120,
        unique=True,
    )

    product_type = models.CharField(
        max_length=20,
        choices=PRODUCT_TYPE_CHOICES,
    )

    order = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    title = models.CharField(max_length=200)

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

    order = models.PositiveIntegerField(default=0)

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


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

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.product.title} image"


class ProductBenefit(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="benefits",
    )

    text = models.CharField(max_length=255)

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.text


class ProductFAQ(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="faqs",
    )

    question = models.CharField(max_length=255)

    answer = models.TextField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.question