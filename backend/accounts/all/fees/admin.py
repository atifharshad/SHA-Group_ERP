from django.contrib import admin
from .models import *
# Register your models here.
class PaymentTypeAdmin(admin.ModelAdmin):
    search_fields = ['name']

class CognitiveInternshipFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no

    def name(self, obj):
        return obj.received_from.name
    
    def contact(self, obj):
        return obj.received_from.contact_1

class AcademicInternshipFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no

    def name(self, obj):
        return obj.received_from.name
    
    def contact(self, obj):
        return obj.received_from.contact_1

class EmployeeInternshipFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no if obj.received_from else "unknown"

    def name(self, obj):
        return obj.received_from.name if obj.received_from else "unknown"
    
    def contact(self, obj):
        return obj.received_from.contact_1 if obj.received_from else "unknown"

class CognitiveWorkshopFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no

    def name(self, obj):
        return obj.received_from.name
    
    def contact(self, obj):
        return obj.received_from.contact_1

class AcademicWorkshopFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no

    def name(self, obj):
        return obj.received_from.name
    
    def contact(self, obj):
        return obj.received_from.contact_1

class StudentProjectFeesAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__register_no','received_from__name', 'received_from__contact_1', ]
    list_display = ['receipt_no','register_no', 'name', 'contact', 'date', 'amount',]

    def register_no(self,obj):
        return obj.received_from.register_no

    def name(self, obj):
        return obj.received_from.name
    
    def contact(self, obj):
        return obj.received_from.contact_1

class ClientProjectBillAdmin(admin.ModelAdmin):
    search_fields = ['receipt_no', 'received_from__project_no','received_from__client_name', 'received_from__client_contact', ]
    list_display = ['receipt_no','project_no', 'name', 'contact', 'date', 'amount',]

    def project_no(self,obj):
        return obj.received_from.project_no

    def name(self, obj):
        return obj.received_from.client_name
    
    def contact(self, obj):
        return obj.received_from.client_contact

admin.site.register(PaymentType, PaymentTypeAdmin)
admin.site.register(CognitiveInternshipFees, CognitiveInternshipFeesAdmin)
admin.site.register(AcademicInternshipFees, AcademicInternshipFeesAdmin)
admin.site.register(EmployeeInternshipFees, EmployeeInternshipFeesAdmin)
admin.site.register(CognitiveWorkshopFees, CognitiveWorkshopFeesAdmin)
admin.site.register(AcademicWorkshopFees, AcademicWorkshopFeesAdmin)
admin.site.register(StudentProjectFees, StudentProjectFeesAdmin)
admin.site.register(ClientProjectBill, ClientProjectBillAdmin)
