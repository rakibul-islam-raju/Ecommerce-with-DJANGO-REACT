from decimal import Decimal
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from shop.models import Product
from core.permissions import IsStaffOrOwnerAuthenticated

from .models import Order, OrderItem
from .serializers import (
    OrderSerializer,
    OrderDetailSerializer,
    ShippingAddressSerializer,
)


class OrderListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(added_by=self.request.user)

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        order_items = data.get("orderItems")
        shipping_data = data.get("shippingAddress")

        if order_items and len(order_items) == 0:
            return Response(
                {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            order_serializer = OrderSerializer(
                data={
                    "added_by": user.pk,
                    "payment_method": data.get("paymentMethod"),
                    "tax_price": data.get("taxPrice"),
                    "shipping_price": data.get("shippingPrice"),
                    "total_price": data.get("totalPrice"),
                }
            )
            order_serializer.is_valid(raise_exception=True)
            order = order_serializer.save()

            # validate shipping address
            shipping_serializer = ShippingAddressSerializer(
                data={
                    "order": order.pk,
                    "address": shipping_data.get("address"),
                    "city": shipping_data.get("city"),
                    "region": shipping_data.get("region"),
                    "postal_code": shipping_data.get("postalCode"),
                    "country": shipping_data.get("country"),
                }
            )
            shipping_serializer.is_valid(raise_exception=True)
            shipping_serializer.save()

            # create order items and add to order
            for i in order_items:
                product = Product.objects.get(id=i["product"])
                item = OrderItem(
                    product=product,
                    order=order,
                    name=product.name,
                    quantity=int(i["qty"]),
                    price=Decimal(i["price"]),
                    image=product.image,
                )
                item.save()

                # update stock
                product.in_stock -= item.quantity
                product.save()

            serializer = OrderDetailSerializer(order, many=False)
            return Response(serializer.data)


class OrderDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsStaffOrOwnerAuthenticated]
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()


class AllOrders(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
