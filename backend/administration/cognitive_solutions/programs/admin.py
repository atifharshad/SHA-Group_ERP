from django.contrib import admin
from .models import Company, College, Course, Stream, Frontend, Backend, Internship, Batch, Workshop, CognitiveInternship, AcademicInternship, EmployeeInternship, CognitiveWorkshop, AcademicWorkshop
# Register your models here.
class CollegeAdmin(admin.ModelAdmin):
    search_fields = ['name', 'district', 'state']
    list_display = ['name', 'place', 'district', 'state']
    
class CompanyAdmin(admin.ModelAdmin):
    search_fields = ['name', 'place', 'website']
    list_display = ['name', 'place', 'website']

class CourseAdmin(admin.ModelAdmin):
    search_fields = ['name',]
    list_display = ['name', 'max_sem']

class StreamAdmin(admin.ModelAdmin):
    search_fields = ['name',]
    list_display = ['name', 'course_name']
    list_filter = ['course']

    def course_name(self, obj):
        return obj.course.name

class FrontendAdmin(admin.ModelAdmin):
    search_fields = ['name']

class BackendAdmin(admin.ModelAdmin):
    search_fields = ['name']

class InternshipAdmin(admin.ModelAdmin):
    search_fields = ['name',]
    list_display = ['name', 'no_of_months', 'frontend', 'backend', 'actual_fees']
    list_filter = ['frontend', 'backend']

class BatchAdmin(admin.ModelAdmin):
    search_fields = ['name', 'internship__name']
    list_display = ['name', 'internship_name', 'start_date', 'end_date', 'from_time', 'to_time','status']
    list_filter = ['status']

    def internship_name(self, obj):
        return obj.internship.name

class WorkshopAdmin(admin.ModelAdmin):
    search_fields = ['name', 'technology']
    list_display = ['name', 'start_date', 'end_date', 'from_time', 'to_time','technology', 'actual_fees']

class CognitiveInternshipAdmin(admin.ModelAdmin):
    search_fields = ['register_no', 'name', 'contact_1']
    list_display = ['register_no', 'name', 'contact_1', 'college_name', 'batch_name', 'is_fees_paid']
    list_filter = ['college', 'batch', 'is_fees_paid']
    
    def college_name(self, obj):
        return obj.college.name

    def batch_name(self, obj):
        return obj.batch.name

class AcademicInternshipAdmin(admin.ModelAdmin):
    search_fields = ['register_no', 'name', 'contact_1']
    list_display = ['register_no', 'name', 'contact_1', 'college_name', 'batch_name', 'is_fees_paid']
    list_filter = ['college', 'batch', 'is_fees_paid']
    
    def college_name(self, obj):
        return obj.college.name

    def batch_name(self, obj):
        return obj.batch.name

class EmployeeInternshipAdmin(admin.ModelAdmin):
    search_fields = ['register_no', 'name', 'contact_1']
    list_display = ['register_no', 'name', 'contact_1', 'company_name', 'role', 'batch_name', 'is_fees_paid']
    list_filter = ['company', 'batch', 'is_fees_paid']
    
    def company_name(self, obj):
        return obj.company.name

    def batch_name(self, obj):
        return obj.batch.name

class CognitiveWorkshopAdmin(admin.ModelAdmin):
    search_fields = ['register_no', 'name', 'contact_1']
    list_display = ['register_no', 'name', 'contact_1', 'college_name', 'workshop_name', 'is_fees_paid']
    list_filter = ['college', 'workshop', 'is_fees_paid']
    
    def college_name(self, obj):
        return obj.college.name

    def workshop_name(self, obj):
        return obj.workshop.name

class AcademicWorkshopAdmin(admin.ModelAdmin):
    search_fields = ['register_no', 'name', 'contact_1']
    list_display = ['register_no', 'name', 'contact_1', 'college_name', 'workshop_name', 'is_fees_paid']
    list_filter = ['college', 'workshop', 'is_fees_paid']
    
    def college_name(self, obj):
        return obj.college.name

    def workshop_name(self, obj):
        return obj.workshop.name

admin.site.register(College, CollegeAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Stream, StreamAdmin)
admin.site.register(Frontend, FrontendAdmin)
admin.site.register(Backend, BackendAdmin)
admin.site.register(Internship, InternshipAdmin)
admin.site.register(Batch, BatchAdmin)
admin.site.register(Workshop, WorkshopAdmin)
admin.site.register(CognitiveInternship, CognitiveInternshipAdmin)
admin.site.register(AcademicInternship, AcademicInternshipAdmin)
admin.site.register(EmployeeInternship, EmployeeInternshipAdmin)
admin.site.register(CognitiveWorkshop, CognitiveWorkshopAdmin)
admin.site.register(AcademicWorkshop, AcademicWorkshopAdmin)
