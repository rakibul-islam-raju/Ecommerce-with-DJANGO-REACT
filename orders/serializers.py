from rest_framework import serializers

from core.serializers import UserSerializer
from shop.serializers import ProductSerializer

from .models import Order, OrderItem, ShippingAddress


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    # product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        items = obj.order_items.all()
        serilizer = OrderItemSerializer(items, many=True)
        return serilizer.data

    def get_shipping_address(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shipping_address, many=False)
            return address.data
        except:
            address = False

    def get_user(self, obj):
        user = obj.added_by
        serilizer = UserSerializer(user, many=False)
        return serilizer.data
