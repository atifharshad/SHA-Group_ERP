import imp
from django.db import models
from administration.cognitive_solutions.programs.models import Company, Frontend, Backend
from django.core.validators import MinLengthValidator,int_list_validator, MinValueValidator
import datetime
from django.db.models.signals import pre_save
# from django.utils.translation import gettext_lazy as _
# from django.core.exceptions import ValidationError
# Create your models here.

class ClientProject(models.Model):
    ONGOING = 0
    COMPLETED = 1
    STATUS_CHOICES = (
        (ONGOING, 'Ongoing'),
        (COMPLETED, 'Completed'),
    )

    project_no = models.CharField(max_length=8, unique=True, editable=False,)
    title = models.CharField(max_length=40)
    description = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True)
    client_name = models.CharField(max_length=40)
    client_contact = models.CharField(max_length=10, validators=[int_list_validator(sep='',), MinLengthValidator(10), ])
    client_email = models.EmailField()
    frontend = models.ForeignKey(Frontend, on_delete=models.SET_NULL, null=True) 
    backend = models.ForeignKey(Backend, on_delete=models.SET_NULL, null=True) 
    status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=ONGOING, validators=[MinValueValidator(0)],)
    cost = models.FloatField(validators=[MinValueValidator(0)])
    concession = models.FloatField(validators=[MinValueValidator(0)])
    is_paid = models.BooleanField(default=False, editable=False)

    def __str__(self):
        return self.client_name + ':' + self.title

def set_project_no(sender, instance, **kwargs):
    if instance._state.adding:
        try:
            latest_id = int(sender.objects.latest('id').project_no[-3:])
        except sender.DoesNotExist:
            latest_id = 0
        year = str(datetime.datetime.now().year)[-2:]
        instance.project_no = 'CP' + year + '-' + "{:03d}".format(latest_id + 1)

pre_save.connect(set_project_no, sender=ClientProject)