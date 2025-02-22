# Generated by Django 3.1.2 on 2020-10-22 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0003_stream'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='stream',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='stream',
            constraint=models.UniqueConstraint(fields=('course', 'name'), name='limit_course'),
        ),
    ]
