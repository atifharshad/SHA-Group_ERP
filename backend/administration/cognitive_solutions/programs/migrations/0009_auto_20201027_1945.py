# Generated by Django 3.1.2 on 2020-10-27 19:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0008_internship'),
    ]

    operations = [
        migrations.AddField(
            model_name='academicinternship',
            name='internship',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='programs.internship'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cognitiveinternship',
            name='internship',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, to='programs.internship'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='employeeinternship',
            name='internship',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='programs.internship'),
            preserve_default=False,
        ),
    ]
