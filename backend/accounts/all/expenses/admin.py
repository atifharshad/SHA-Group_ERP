from tkinter import W
from django.contrib import admin
from .models import AccountHead, Expense
# Register your models here.
class AccountHeadAdmin(admin.ModelAdmin):
    search_fields = ['name']

class ExpenseAdmin(admin.ModelAdmin):
    search_fields = ['paid_by', 'paid_to']
    list_display = ['description','paid_by', 'paid_to', 'paid_amount', 'paid_status', 'division']
    list_filter = ['paid_status', 'division']

admin.site.register(AccountHead, AccountHeadAdmin)
admin.site.register(Expense, ExpenseAdmin)
