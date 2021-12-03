from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Course(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название курса')
    description = models.TextField(verbose_name='Описание')
    symbol = models.ImageField(verbose_name='Значок')
    students = models.ManyToManyField('StudentInCourse', blank=True)

    def __str__(self):
        return self.title


class Student(models.Model):
    first_name = models.CharField(max_length=255, verbose_name='Имя')
    last_name = models.CharField(max_length=255, verbose_name='Фамилия')
    email = models.CharField(max_length=255, verbose_name='Email')
    cf_handle = models.CharField(max_length=255, verbose_name='codeforces')
    photo = models.ImageField(verbose_name='Фото')
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


class StudentInCourse(models.Model):
    student_rel = models.ForeignKey('Student', on_delete=models.CASCADE)
    course_rel = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.student_rel} / {self.course_rel}"


class Task(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название задания')
    description = models.TextField(verbose_name='Описание')
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class CourseEntry(models.Model):
    title = models.CharField(max_length=255, verbose_name='Название поста')
    body = models.TextField(verbose_name='Содержание поста')
    course = models.ForeignKey('Course', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
