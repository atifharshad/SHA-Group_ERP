# Generated by Django 3.1.2 on 2020-10-27 18:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0005_auto_20201027_1155'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='academicworkshop',
            name='guardian_contact',
        ),
        migrations.RemoveField(
            model_name='cognitiveinternship',
            name='course',
        ),
        migrations.RemoveField(
            model_name='cognitiveinternship',
            name='semester',
        ),
        migrations.RemoveField(
            model_name='cognitiveworkshop',
            name='guardian_contact',
        ),
    ]
