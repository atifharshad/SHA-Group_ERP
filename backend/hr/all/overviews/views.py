from rest_framework import views
from rest_framework import permissions
from projects.dataque_systems.client_projects.models import ClientProject
from administration.cognitive_solutions.programs.models import *
from users.permissions import IsHR, IsAccountsSafe
from rest_framework.response import Response
# Create your views here.
class Overview(views.APIView):
    permission_classes = [permissions.IsAuthenticated & (IsHR | IsAccountsSafe | permissions.IsAdminUser)]

    def get(self, request, format=None):
        cp = ClientProject.objects.all()
        projects = cp.count()
        comapanys = cp.values('company').distinct().count()

        ci = CognitiveInternship.objects.all()
        ai = AcademicInternship.objects.all()
        ei = EmployeeInternship.objects.all()
        cw = CognitiveWorkshop.objects.all()
        aw = AcademicInternship.objects.all()
        ci_students = ci.count()
        ai_students = ai.count()
        ei_employees = ei.count()
        cw_students = cw.count()
        aw_students = aw.count()
        ci_colleges = ci.values('college').distinct().count()
        ai_colleges = ai.values('college').distinct().count()
        ei_companys= ei.values('company').distinct().count()
        cw_colleges = cw.values('college').distinct().count()
        aw_colleges = aw.values('college').distinct().count()
        students = ci_students + ai_students + ei_employees + cw_students + aw_students
        colleges = ci_colleges + ai_colleges + ei_companys + cw_colleges + aw_colleges


        data = {"projects": projects, "companys": comapanys,
        "students": students, "colleges": colleges,
        } 
        return Response(data)
