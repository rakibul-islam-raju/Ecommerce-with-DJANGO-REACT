from rest_framework import serializers

from orders.models import Order, OrderItem
from core.serializers import UserSerializer

from .models import Category, Brand, Product, Review


# Category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


# Brand serializer
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    added_by = UserSerializer()

    class Meta:
        model = Review
        fields = "__all__"


# Review Serializer
class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["product", "rating", "comment"]

    def validate(self, data):
        # check if user already reviewed this product
        review_instance = Review.objects.filter(
            product=data["product"],
            added_by=self.context["request"].user,
        ).exists()
        if review_instance:
            raise serializers.ValidationError("Product already reviewed.")

        # check if user bought this product
        order_items = OrderItem.objects.filter(
            product=data["product"],
            order__added_by=self.context["request"].user,
        ).exists()
        if not order_items:
            raise serializers.ValidationError("You must buy this product to review.")

        return data


# Product serializer
class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "name",
            "price",
            "image",
            "brand",
            "category",
            "description",
            "rating",
            "in_stock",
            "added_by",
        ]


# Product serializer
class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "price",
            "image",
            "brand",
            "category",
            "description",
            "in_stock",
            "added_by",
            "is_active",
            "created_at",
            "updated_at",
            "total_reviews",
            "rating",
        ]
