from django.db import models
from django.db.models import Avg
from django.core.validators import MaxValueValidator
from django.utils.text import slugify

from core.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(blank=True, null=False, unique=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["-id"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class SubCategory(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(blank=True, null=False, unique=True)

    class Meta:
        ordering = ["-id"]
        verbose_name = "Sub Category"
        verbose_name_plural = "Sub Categories"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Product(BaseModel):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(blank=True, null=False, unique=True)
    actual_price = models.DecimalField(max_digits=8, decimal_places=2)
    offer_price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    image = models.ImageField(upload_to="products/", blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    description = models.TextField()
    in_stock = models.IntegerField(default=0)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    @property
    def current_price(self):
        if self.offer_price > 0.00:
            return self.offer_price
        else:
            return self.actual_price

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
