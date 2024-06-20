from django.contrib import admin
from .models import SSLC, PUC, StudentProject, Trainer, TrainerRole, Project
# Register your models here.
class SSLCAdmin(admin.ModelAdmin):
    search_fields = ['name']

class PUCAdmin(admin.ModelAdmin):
    search_fields = ['name']

class TrainerRoleAdmin(admin.ModelAdmin):
    search_fields = ['name']

class TrainerAdmin(admin.ModelAdmin):
    search_fields = ['name']

class StudentProjectAdmin(admin.ModelAdmin):
    search_fields = ['register_no','name', 'contact_1', ]
    list_display = ['register_no', 'project_title', 'name', 'contact_1', 'fees', 'is_fees_paid']
    list_filter = ['is_fees_paid']
    
    def fees(self, obj):
        return obj.actual_fees - obj.concession

    def project_title(self, obj):
        return obj.project.title

class ProjectAdmin(admin.ModelAdmin):
    search_fields = ['title',]
    list_display = ['title', 'description', 'frontend', 'backend', 'from_date', 'to_date']
    list_filter = ['frontend', 'backend']
    

admin.site.register(SSLC, SSLCAdmin)
admin.site.register(PUC, PUCAdmin)
admin.site.register(StudentProject, StudentProjectAdmin)
admin.site.register(TrainerRole, TrainerRoleAdmin)
admin.site.register(Trainer, TrainerAdmin)
admin.site.register(Project, ProjectAdmin)