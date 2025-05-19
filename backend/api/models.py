from django.db import models

class ChatEntry(models.Model):
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat @ {self.created_at:%Y-%m-%d %H:%M}"
