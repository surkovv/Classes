from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import Course, CourseEntry


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


class CurrentUserView(APIView):

    def get(self, request, *args, **kwargs):
        data = {
            'name': 'Вася Пупкин',
        }
        return Response(data)
