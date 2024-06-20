from rest_framework.permissions import IsAdminUser 
from users.permissions import IsAdministration, IsAccountsSafe, IsHRSafe

PERMISSION_CLASSES_FOR_ADMINISTRATION = IsAdminUser | IsAdministration | IsAccountsSafe | IsHRSafe
