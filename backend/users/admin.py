from django.contrib import admin
from django.utils.html import format_html
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm, UserCreationForm
from shagroup.settings import STATIC_URL

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'first_name', 'last_name','department', 'is_active',)
    list_filter = ('is_staff', 'is_active', 'department')
    list_editable = ('is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        ('Personal info', {'fields': ('first_name', 'last_name', )}),
        ('Permissions', {'fields': ( 'is_staff', 'is_superuser',)}),
        ('important dates', {'fields': ('last_login', 'date_joined',)}),
        ('Department', {
            'classes': ('wide',),
            'fields': ('department', 'role')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email','password1', 'password2',)}
        ),
        ('Personal info', {
            'classes': ('wide',),
            'fields': ('first_name', 'last_name', )}),
        ('Department', {
            'classes': ('wide',),
            'fields': ('department', 'role')}),
    )
    search_fields = ('email', 'first_name', 'last_name',)
    ordering = ('email',)
    # filter_horizontal = ()


# class CustomAccountAdmin(admin.ModelAdmin):
#     list_display = ['image_tag','username','first_name','last_name', 'gender', 'mobile_no',]
#     search_fields = ('user__username', 'user__first_name', 'user__last_name', 'user__mobile_no')
#     list_filter = ('user__is_active',)
#     list_display_links = ('username', 'image_tag',)
    
#     def image_tag(self, obj):
#         if obj.user.profile_pic:
#             return format_html('<img src="{}" width="40px" height="40px"/>'.format(obj.user.profile_pic.url))
#         else:
#             return format_html('<img src="{}profile_pic/default.png" width="40px" height="40px"/>'.format(STATIC_URL))
#     image_tag.short_description = 'Profile pic' 
   
#     def username(self, obj):
#         return obj.user.username
    
#     def first_name(self, obj):
#         return obj.user.first_name 

#     def last_name(self, obj):
#         return obj.user.last_name

#     def mobile_no(self, obj):
#         return obj.user.mobile_no

#     def gender(self, obj):
#         return obj.user.gender
    
admin.site.register(User, UserAdmin)