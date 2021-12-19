from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from django.contrib.auth.models import User
from rest_framework import viewsets, mixins
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Course, CourseEntry, Task, StudentInCourse, AdditionalInfo
from .serializers import UserSerializer, AdditionalInfoSerializer
from rest_framework.parsers import MultiPartParser, FormParser

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
        if request.user.is_anonymous:
            data['entries'] = ['Unauthorized']
        else:
            student_in_course = StudentInCourse.objects.filter(course_rel_id=id, student_rel_id=request.user.id)
            if len(student_in_course) == 0:
                data['entries'] = ['No access']
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
                    'description': task.description,
                    'mark': task.mark
                } for task in Task.objects.filter(course__exact=id)
            ]
        }
        return Response(data)


class CurrentUser(APIView):
    def get(self, request):
        if request.user.is_anonymous:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
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
        try:
            user = User.objects.create(**request.data)
            user.set_password(request.data['password'])
            user.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='User with the same username already exists')
        return Response(status=status.HTTP_201_CREATED)


class ChangeCreds(APIView):

    def post(self, request):

        user = request.user
        if user.is_anonymous:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        try:
            if user.username != request.data['username']:
                user.username = request.data['username']
            user.email = request.data['email']
            user.first_name = request.data['first_name']
            user.last_name = request.data['last_name']

            if len(request.data['password']) > 0:
                user.set_password(request.data['password'])

            user.save()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST, data='User with the same username already exists')
        return Response(status=status.HTTP_201_CREATED)


class LogoutView(APIView):

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            print(refresh_token)
            token = RefreshToken(refresh_token)
            print(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class PhotoView(APIView):

    def get(self, request):
        if request.user.is_anonymous:
            return Response({
                'img_url': '/media/resources/blank.png'
            })
        infos = AdditionalInfo.objects.filter(user_id=request.user.id)
        if len(infos) == 0:
            return Response({
                'img_url': '/media/resources/blank.png'
            })
        return Response({
                'img_url': infos[0].photo.url
        })


class ChangePhotoView(ListAPIView):
    queryset = AdditionalInfo.objects.all()
    serializer_class = AdditionalInfoSerializer

    def post(self, request):
        if request.user.is_anonymous:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        AdditionalInfo.objects.filter(user_id=request.user.id).delete()

        info = AdditionalInfo.objects.create(user_id=request.user.id, photo=request.data['image'])
        return Response(status=status.HTTP_201_CREATED)