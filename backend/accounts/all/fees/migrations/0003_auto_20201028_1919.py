# Generated by Django 3.1.2 on 2020-10-28 19:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fees', '0002_auto_20201028_1457'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='academicinternshipfees',
            name='purpose',
        ),
        migrations.RemoveField(
            model_name='cognitiveinternshipfees',
            name='purpose',
        ),
        migrations.RemoveField(
            model_name='employeeinternshipfees',
            name='purpose',
        ),
    ]
