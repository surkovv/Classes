from django.contrib import admin
from django.urls import path, include
from .views import *

urlpatterns = [
    path('current_user/', CurrentUserView.as_view(), name='current_user'),
    path('courses/', CoursesListView.as_view(), name='courses_list'),
    path('course/', CourseView.as_view(), name='course')
]
