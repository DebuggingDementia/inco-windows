import logging

from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework import generics

from .models import QuoteRequest
from .serializers import QuoteRequestSerializer


logger = logging.getLogger(__name__)


class QuoteCreateView(generics.CreateAPIView):
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer

    def perform_create(self, serializer):
        quote = serializer.save()

        subject = f"New Free Quote Request - {quote.full_name}"

        body = f"""
New quote request received from the INCO Windows website.

CUSTOMER INFORMATION

Name: {quote.full_name}
Phone: {quote.phone}
Email: {quote.email}

PROJECT DETAILS

{quote.message or "No project details provided."}

SUBMITTED

{quote.created_at.strftime("%B %d, %Y at %I:%M %p")}
"""

        try:
            email = EmailMessage(
                subject=subject,
                body=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[settings.QUOTE_NOTIFICATION_EMAIL],
                reply_to=[quote.email],
            )

            email.send(fail_silently=False)

        except Exception:
            logger.exception(
                "Failed to send quote notification email for quote %s",
                quote.id,
            )