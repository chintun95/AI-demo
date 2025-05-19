# views.py
import openai
import os
import traceback
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from dotenv import load_dotenv
from .models import ChatEntry
from .serializers import ChatEntrySerializer

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

class PromptView(APIView):
    def post(self, request):
        try:
            prompt = request.data.get("prompt")
            if not prompt:
                return Response({"error": "Prompt is required"}, status=400)

            completion = openai.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}]
            )
            return Response({"response": completion.choices[0].message.content})
        except Exception as e:
            print("🔥 Error in /api/prompt/:", e)
            traceback.print_exc()  
            return Response({"error": str(e)}, status=500)
        

class ChatEntryListCreateView(generics.ListCreateAPIView):
    queryset = ChatEntry.objects.all().order_by('-created_at')
    serializer_class = ChatEntrySerializer
