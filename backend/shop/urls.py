from django.urls import path

from .views import (
    CategoryListCreateView,
    SubCategoryListCreateView,
    CategoryDetailView,
    ProductListCreateView,
    ProductDetailView,
    TopRatedProducts,
    RelatedProducts,
    ReviewListCreateView,
)

urlpatterns = [
    # category
    path("categories", CategoryListCreateView.as_view(), name="category_list_create"),
    path("categories/<int:pk>", CategoryDetailView.as_view(), name="category_detail"),
    # sub_category
    path(
        "brands", SubCategoryListCreateView.as_view(), name="sub_category_list_create"
    ),
    # products
    path("products", ProductListCreateView.as_view(), name="products_list_create"),
    path(
        "products/related/<int:category_id>",
        RelatedProducts.as_view(),
        name="products_related",
    ),
    path("products/<int:pk>", ProductDetailView.as_view(), name="product_detail"),
    path("products/top", TopRatedProducts.as_view(), name="products_top"),
    # review
    path("reviews", ReviewListCreateView.as_view(), name="review_list_create"),
]
