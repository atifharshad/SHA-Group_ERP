# Generated by Django 3.1.2 on 2020-11-10 21:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0012_auto_20201028_1504'),
        ('fees', '0004_auto_20201028_1934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cognitiveinternshipfees',
            name='received_from',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ci_fees', to='programs.cognitiveinternship'),
        ),
    ]
