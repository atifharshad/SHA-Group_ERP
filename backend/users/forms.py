from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User
from django.contrib.auth import password_validation 
from datetime import datetime

class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        # fields = ('email', 'password', 'is_active', 'is_customer', 'is_cashier', 'is_delivery_guy')
        fields = '__all__'

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2
    
    def clean_date_of_birth(self):
        dob = self.cleaned_data['date_of_birth']
        age = (datetime.now().date() - dob).days/365
        if age < 18:
            raise forms.ValidationError('Must be at least 18 years old to register')
        return dob

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()
    password = ReadOnlyPasswordHashField(label=("Password"),
        help_text=("Raw passwords are not stored, so there is no way to see "
                    "this user's password, but you can change the password "
                    "using <a href=\"../password/\">this form</a>."))
    class Meta:
        model = User
        # fields = ('email', 'password', 'is_active', 'is_customer', 'is_cashier', 'is_delivery_guy')
        fields = '__all__'

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]

# class UserSignInForm(forms.ModelForm):
#     password = forms.CharField(label='Password', widget=forms.PasswordInput)
    
#     class Meta:
#         model = User 
#         fields = ['username',] 


# class UserSignUpForm(forms.ModelForm):
#     password1 = forms.CharField(label='Password', widget=forms.PasswordInput) 
#     password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

#     class Meta:
#         model = User
#         fields = ('username', 'password1', 'password2', 'profile_pic','first_name', 'last_name', 'date_of_birth', 'gender', 'mobile_no')
#         # fields = '__all__'

#     def clean_password1(self):
#         # Check that the two password entries match
#         password1 = self.cleaned_data.get("password1")

#         password_validation.validate_password(
#             self.cleaned_data['password1'],
#             self.instance
#         )
#         return password1

#     def clean_password2(self):
#         # Check that the two password entries match
#         password1 = self.cleaned_data.get("password1")
#         password2 = self.cleaned_data.get("password2")
#         print(password1, password2)
#         if password1 and password2 and password1 != password2:
#             raise forms.ValidationError("Passwords don't match")

#         return password2

#     def clean_date_of_birth(self):
#         dob = self.cleaned_data['date_of_birth']
#         age = (datetime.now().date() - dob).days/365
#         if age < 18:
#             raise forms.ValidationError('Must be at least 18 years old to register')
#         return dob

#     def save(self, commit=True):
#         # Save the provided password in hashed format
#         user = super().save(commit=False)
#         user.set_password(self.cleaned_data["password1"])
#         if commit:
#             user.save()
#         return user
