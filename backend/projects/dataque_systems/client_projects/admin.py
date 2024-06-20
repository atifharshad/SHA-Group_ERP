import imp
from django.contrib import admin
from .models import ClientProject
# Register your models here.

class ClientProjectAdmin(admin.ModelAdmin):
    list_display = ['project_no', 'title','client_name', 'client_contact', 'status', 'is_paid',]
    search_fields = ('client_name', 'title', 'client_contact', 'project_no')
    list_filter = ['status', 'is_paid']

admin.site.register(ClientProject, ClientProjectAdmin)