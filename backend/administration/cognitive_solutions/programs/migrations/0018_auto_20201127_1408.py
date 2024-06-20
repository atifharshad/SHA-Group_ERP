# Generated by Django 3.1.2 on 2020-11-27 14:08

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0017_workshop_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='academicinternship',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='academicinternship',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='academicworkshop',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='academicworkshop',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='cognitiveinternship',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='cognitiveinternship',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='cognitiveworkshop',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='cognitiveworkshop',
            name='start_date',
        ),
        migrations.RemoveField(
            model_name='employeeinternship',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='employeeinternship',
            name='start_date',
        ),
        migrations.AddField(
            model_name='internship',
            name='end_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='internship',
            name='start_date',
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
