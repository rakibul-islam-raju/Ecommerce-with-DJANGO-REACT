from django.urls import path

from .views import (
    MyTokenObtailPairView,
    UserListView,
    UserDetailView,
    UserRegistrationView,
    ProfileView,
)

urlpatterns = [
    # auth
    path("auth/login", MyTokenObtailPairView.as_view(), name="token_obtain_pair"),
    path("auth/registration", UserRegistrationView.as_view(), name="registration"),
    #  users
    path("users", UserListView.as_view(), name="users"),
    path("users/<int:pk>", UserDetailView.as_view(), name="user_details"),
    # path("users/profile", get_user_profile, name="user_profile"),
    path("users/profile/<int:pk>", ProfileView.as_view(), name="update_user_profile"),
]
