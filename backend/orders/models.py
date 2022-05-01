from django.db import models

from core.models import BaseModel, User

from shop.models import Product


class Order(BaseModel):
    payment_method = models.CharField(
        max_length=200, blank=True, null=True
    )  # non-required
    tax_price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    shipping_price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    total_price = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(auto_now_add=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return str(self.created_at)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to="OrderItems/", blank=True, null=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, related_name="shipping_address"
    )
    address = models.TextField()
    city = models.CharField(max_length=200)
    region = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    country = models.CharField(max_length=200)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.address
