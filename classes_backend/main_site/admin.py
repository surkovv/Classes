from django.contrib import admin

from .models import *

admin.site.register(Course)
admin.site.register(CourseEntry)
admin.site.register(Task)
admin.site.register(StudentInCourse)
admin.site.register(AdditionalInfo)

