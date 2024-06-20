from django.urls import path, include

urlpatterns = [
    path('dataqueue_systems/client_projects/', include('projects.dataque_systems.client_projects.urls')),
]