from django.urls import path, include

urlpatterns = [
    path('all/', include('hr.all.overviews.urls')),
]