from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from ..models import Course, CourseEntry, Task
from .serializers import UserSerializer


class CoursesListView(APIView):

    def get(self, request, *args, **kwargs):
        data = {
            'courses': [
                {
                    'id': course.id,
                    'name': course.title,
                    'description': course.description,
                    'img_url': course.symbol.url
                } for course in Course.objects.all()
            ]
        }
        return Response(data)


class CourseView(APIView):

    def get(self, request, *args, **kwargs):
        id = request.GET['id']
        course = Course.objects.get(id=id)
        data = {
            'course':
                {
                    'id': course.id,
                    'name': course.title,
                    'description': course.description,
                    'img_url': course.symbol.url
                },
            'entries': [
                {
                    'title': entry.title,
                    'body': entry.body
                } for entry in CourseEntry.objects.filter(course__exact=id)
            ]
        }
        return Response(data)


class TasksView(APIView):

    def get(self, request, *args, **kwargs):
        id = request.GET['id']
        course = Course.objects.get(id=id)
        data = {
            'course':
                {
                    'id': course.id,
                    'name': course.title,
                    'description': course.description,
                    'img_url': course.symbol.url
                },
            'tasks': [
                {
                    'title': task.title,
                    'description': task.description
                } for task in Task.objects.filter(course__exact=id)
            ]
        }
        return Response(data)


class CurrentUser(APIView):
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class UserViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def perform_create(self, serializer):
        user = User.objects.create_user(**serializer.validated_data)
        user.set_password(serializer.validated_data['password'])
        return user


class Registration(APIView):

    def post(self, request):
        user = User.objects.create(**request.data)
        user.set_password(request.data['password'])
        user.save()

        return Response(status=status.HTTP_201_CREATED)
