# Generated by Django 3.1.2 on 2020-10-27 22:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student_projects', '0004_auto_20201022_1450'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentproject',
            old_name='gaurdian_name',
            new_name='guardian_name',
        ),
    ]
