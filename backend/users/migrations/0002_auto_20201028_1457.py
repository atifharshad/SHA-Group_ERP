# Generated by Django 3.1.2 on 2020-10-28 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='department',
            field=models.PositiveSmallIntegerField(choices=[(0, 'Other'), (1, 'Administration'), (2, 'ACCOUNTS')], default=0),
        ),
    ]
