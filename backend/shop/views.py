from django.db.models import Avg
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .models import Category, SubCategory, Product, Review
from .serializers import (
    CategorySerializer,
    SubCategorySerializer,
    ProductSerializer,
    ProductCreateSerializer,
    ReviewCreateSerializer,
    ReviewSerializer,
)


class CategoryListCreateView(ListCreateAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(CategoryListCreateView, self).get_permissions()


class SubCategoryListCreateView(ListCreateAPIView):
    queryset = SubCategory.objects.filter(is_active=True)
    serializer_class = SubCategorySerializer

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(SubCategoryListCreateView, self).get_permissions()


class CategoryDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUser]


class TopRatedProducts(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        products = (
            Product.objects.filter(is_active=True)
            .distinct()
            .annotate(avg_rating=Avg("review__rating"))
            .order_by("-avg_rating")[0:4]
        )
        return products


class RelatedProducts(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        products = Product.objects.filter(
            is_active=True,
            category=self.kwargs.get("category_id"),
        ).order_by("?")[0:4]
        return products


class ProductListCreateView(ListCreateAPIView):
    def get_queryset(self):
        keyword = self.request.GET.get("keyword")
        if keyword:
            queryset = Product.objects.filter(Q(name__icontains=keyword))
        else:
            queryset = Product.objects.all()

        if self.request.user.is_staff:
            return queryset
        else:
            return queryset.filter(is_active=True)

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ProductCreateSerializer
        else:
            return ProductSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]
        return super(ProductListCreateView, self).get_permissions()


class ProductDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Product.objects.all()
        else:
            return Product.objects.filter(is_active=True)

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(ProductDetailView, self).get_permissions()


class ReviewListCreateView(ListCreateAPIView):
    queryset = Review.objects.all()
    filterset_fields = ["product"]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ReviewCreateSerializer
        else:
            return ReviewSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(ReviewListCreateView, self).get_permissions()

    def perform_create(self, serializer):
        serializer.save(added_by=self.request.user)

    def get_serializer_context(self):
        return {"request": self.request}
