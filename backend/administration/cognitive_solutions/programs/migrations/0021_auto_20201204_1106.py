# Generated by Django 3.1.2 on 2020-12-04 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0020_auto_20201127_1419'),
    ]

    operations = [
        migrations.AddField(
            model_name='college',
            name='district',
            field=models.CharField(default='DK', max_length=30),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='college',
            name='state',
            field=models.CharField(default='Karnataka', max_length=30),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='college',
            name='place',
            field=models.CharField(max_length=30),
        ),
    ]
