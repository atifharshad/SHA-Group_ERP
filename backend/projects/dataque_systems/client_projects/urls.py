from django.urls import include, path
from rest_framework import routers
from .views import *

app_name = 'client_projects'

router = routers.DefaultRouter()
router.register(r'projects', ClientProjectViewSet)
# router.register(r'workshops', WorkshopViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)), 
    path('overviews/', Overview.as_view())
]