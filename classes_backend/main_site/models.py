from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Course(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название курса')
    description = models.TextField(verbose_name='Описание')
    symbol = models.ImageField(verbose_name='Значок')
    students = models.ManyToManyField('StudentInCourse', blank=True)

    def __str__(self):
        return self.title


class StudentInCourse(models.Model):
    student_rel = models.ForeignKey(User, on_delete=models.CASCADE)
    course_rel = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student_rel} / {self.course_rel}"


class Task(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название задания')
    description = models.TextField(verbose_name='Описание')
    mark = models.TextField(verbose_name='Оценка', default='0')
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class CourseEntry(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название поста')
    body = models.TextField(verbose_name='Содержание поста')
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
