# Generated by Django 3.2.5 on 2021-12-02 19:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main_site', '0003_auto_20211202_2233'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='Значок',
        ),
        migrations.RemoveField(
            model_name='course',
            name='Название курса',
        ),
        migrations.RemoveField(
            model_name='course',
            name='Описание',
        ),
        migrations.RemoveField(
            model_name='courseentry',
            name='Название поста',
        ),
        migrations.RemoveField(
            model_name='courseentry',
            name='Содержание поста',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Email',
        ),
        migrations.RemoveField(
            model_name='student',
            name='codeforces',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Имя',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Пользователь',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Фамилия',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Фото',
        ),
        migrations.RemoveField(
            model_name='task',
            name='Название задания',
        ),
        migrations.RemoveField(
            model_name='task',
            name='Описание',
        ),
        migrations.AddField(
            model_name='course',
            name='description',
            field=models.TextField(default='', verbose_name='Описание'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='symbol',
            field=models.ImageField(default=None, upload_to='', verbose_name='Значок'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='course',
            name='title',
            field=models.CharField(default=None, max_length=255, verbose_name='Название курса'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courseentry',
            name='body',
            field=models.TextField(default=None, verbose_name='Содержание поста'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='courseentry',
            name='title',
            field=models.CharField(default=None, max_length=255, verbose_name='Название поста'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='cf_handle',
            field=models.CharField(default='', max_length=255, verbose_name='codeforces'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='email',
            field=models.CharField(default='', max_length=255, verbose_name='Email'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='first_name',
            field=models.CharField(default=None, max_length=255, verbose_name='Имя'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='last_name',
            field=models.CharField(default=None, max_length=255, verbose_name='Фамилия'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='photo',
            field=models.ImageField(default=None, upload_to='', verbose_name='Фото'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='user',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='auth.user', verbose_name='Пользователь'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='description',
            field=models.TextField(default=None, verbose_name='Описание'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='task',
            name='title',
            field=models.CharField(default=None, max_length=255, verbose_name='Название задания'),
            preserve_default=False,
        ),
    ]
