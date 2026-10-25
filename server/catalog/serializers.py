from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    product_type = serializers.CharField(
        source="category.product_type",
        read_only=True,
    )

    short = serializers.CharField(
        source="short_description",
        read_only=True,
    )

    explanation = serializers.CharField(
        source="description",
        read_only=True,
    )

    image = serializers.SerializerMethodField()
    gallery = serializers.SerializerMethodField()
    benefits = serializers.SerializerMethodField()
    faq = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "slug",
            "title",
            "product_type",
            "short",
            "explanation",
            "image",
            "gallery",
            "benefits",
            "faq",
        ]

    def get_file_url(self, file_field):
        if not file_field:
            return None

        url = file_field.url

        request = self.context.get("request")

        if request:
            return request.build_absolute_uri(url)

        return url

    def get_image(self, obj):
        return self.get_file_url(obj.hero_image)

    def get_gallery(self, obj):
        return [
            self.get_file_url(item.image)
            for item in obj.gallery.all()
            if item.image
        ]

    def get_benefits(self, obj):
        return [
            benefit.text
            for benefit in obj.benefits.all()
        ]

    def get_faq(self, obj):
        return [
            [faq.question, faq.answer]
            for faq in obj.faqs.all()
        ]