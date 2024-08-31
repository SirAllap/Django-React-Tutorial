from rest_framework import serializers
from .models import Note, Expense
from django.contrib.auth import get_user_model

CustomUser = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "email", "username")  # Adjust fields as needed


class NoteSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Note
        fields = ("id", "title", "content", "created_at", "author")
        extra_kwargs = {"author": {"read_only": True}}


class ExpenseSerializer(serializers.ModelSerializer):
    author = CustomUserSerializer(read_only=True)

    class Meta:
        model = Expense
        fields = ("id", "amount", "content", "created_at", "author")
        extra_kwargs = {"author": {"read_only": True}}
