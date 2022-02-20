from django.urls import path

from .views import OrderListCreateView, OrderDetailView, AllOrders

urlpatterns = [
    path("order", OrderListCreateView.as_view(), name="order_list_create"),
    path("order/<int:pk>", OrderDetailView.as_view(), name="order_detail"),
    path("order/all", AllOrders.as_view(), name="order_all"),
]
