# Generated by Django 3.1.2 on 2020-12-27 12:55

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0027_auto_20201227_1247'),
    ]

    operations = [
        migrations.AddField(
            model_name='batch',
            name='status',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Ongoing'), (0, 'Closed')], default=1, validators=[django.core.validators.MinValueValidator(0)]),
        ),
    ]
