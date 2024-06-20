from rest_framework import serializers
from .models import *
from django_restql.mixins import DynamicFieldsMixin
from utils.utils import ModelValidationMixin
from .models import ClientProject 


class ClientProjectSerializer(DynamicFieldsMixin, ModelValidationMixin, serializers.ModelSerializer):
    class Meta:
        model = ClientProject  
        fields = '__all__'

