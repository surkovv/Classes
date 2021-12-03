# Generated by Django 3.2.5 on 2021-12-02 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_site', '0002_auto_20211202_2218'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentincourse',
            old_name='course',
            new_name='course_rel',
        ),
        migrations.RenameField(
            model_name='studentincourse',
            old_name='student',
            new_name='student_rel',
        ),
        migrations.AlterField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(blank=True, to='main_site.StudentInCourse'),
        ),
    ]
