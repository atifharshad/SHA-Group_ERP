from rest_framework import views
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import filters
from .models import * 
from .serializers import * 
# from django_filters.rest_framework import DjangoFilterBackend
from url_filter.integrations.drf import DjangoFilterBackend
from users.permissions import IsProjects, IsAccountsSafe, IsHRSafe
from rest_framework.response import Response

class ClientProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = ClientProject.objects.all()
    serializer_class = ClientProjectSerializer 
    permission_classes = [permissions.IsAuthenticated & (IsProjects | IsAccountsSafe | IsHRSafe | permissions.IsAdminUser)]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filter_fields = '__all__'
    search_fields = ['client_name', 'client_contact']
    ordering = ['id',]

class Overview(views.APIView):
    permission_classes = [permissions.IsAuthenticated & (IsProjects | IsAccountsSafe | permissions.IsAdminUser)]
    # permission_classes = [PERMISSION_CLASSES_FOR_ADMINISTRATION]

    def get(self, request, format=None):
        cp = ClientProject.objects.all()
        projects = cp.count()
        comapanys = cp.values('company').distinct().count()
        ongoing = cp.filter(status=0).count()
        completed = cp.filter(status=1).count()
        paid = cp.filter(is_paid=True).count()
        pending = cp.filter(is_paid=False).count()

        data = {"projects": projects, "companys": comapanys,
        "ongoing": ongoing, "completed": completed,
        "paid": paid, "pending": pending,
        } 
        return Response(data)
