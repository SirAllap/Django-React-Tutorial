from rest_framework import generics
from ..serializers import ExpenseSerializer
from ..models import Expense
from rest_framework.permissions import IsAuthenticated


class ExpenseListCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
