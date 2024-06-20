# Generated by Django 3.1.2 on 2020-10-28 15:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0010_auto_20201027_2213'),
    ]

    operations = [
        migrations.AddField(
            model_name='academicinternship',
            name='is_fees_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='academicworkshop',
            name='is_fees_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='cognitiveinternship',
            name='is_fees_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='cognitiveworkshop',
            name='is_fees_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='employeeinternship',
            name='is_fees_paid',
            field=models.BooleanField(default=False),
        ),
    ]
