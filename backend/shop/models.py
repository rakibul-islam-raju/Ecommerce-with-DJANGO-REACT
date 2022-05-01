from django.db import models
from django.db.models import Avg
from django.core.validators import MaxValueValidator
from django.core import validators

from core.models import User, BaseModel


class Brand(BaseModel):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name


class Category(BaseModel):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["-id"]

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    in_stock = models.IntegerField(default=0)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name

    @property
    def total_reviews(self):
        return self.review_set.all().count()

    @property
    def rating(self):
        return self.review_set.all().aggregate(Avg("rating"))


class Review(BaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MaxValueValidator(5)])
    comment = models.TextField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.product.name
