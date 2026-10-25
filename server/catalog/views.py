from rest_framework import generics

from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = (
            Product.objects
            .select_related("category")
            .prefetch_related(
                "gallery",
                "benefits",
                "faqs",
            )
            .filter(
                is_published=True,
                category__is_active=True,
            )
        )

        product_type = self.request.query_params.get("type")

        if product_type in ["window", "door"]:
            queryset = queryset.filter(
                category__product_type=product_type
            )

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    queryset = (
        Product.objects
        .select_related("category")
        .prefetch_related(
            "gallery",
            "benefits",
            "faqs",
        )
        .filter(
            is_published=True,
            category__is_active=True,
        )
    )