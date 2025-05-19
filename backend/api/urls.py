from django.urls import path
from .views import PromptView, ChatEntryListCreateView

urlpatterns = [
    path("prompt/", PromptView.as_view(), name="prompt"),
    path("chats/", ChatEntryListCreateView.as_view(), name="chat-history"),
]