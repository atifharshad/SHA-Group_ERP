# Generated by Django 3.1.2 on 2020-10-27 18:54

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0007_cognitiveinternship_previous_course'),
    ]

    operations = [
        migrations.CreateModel(
            name='Internship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('no_of_months', models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('actual_fees', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
                ('backend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.backend')),
                ('frontend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.frontend')),
            ],
        ),
    ]
