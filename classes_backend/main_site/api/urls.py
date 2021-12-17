from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

urlpatterns = [
    path('current_user/', CurrentUser.as_view(), name='current_user'),
    path('courses/', CoursesListView.as_view(), name='courses_list'),
    path('course/', CourseView.as_view(), name='course'),
    path('course/tasks/', TasksView.as_view(), name='tasks'),
    path('register/', Registration.as_view(), name='Register'),
    path('logout/', LogoutView.as_view(), name='Logout')
]
