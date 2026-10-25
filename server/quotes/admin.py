from django.contrib import admin
from django.utils.html import format_html
from django.utils.text import Truncator

from .models import QuoteRequest


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "email_link",
        "phone_link",
        "message_preview",
        "status_badge",
        "created_at",
    )

    list_display_links = (
        "full_name",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "full_name",
        "email",
        "phone",
        "message",
    )

    readonly_fields = (
        "created_at",
    )

    ordering = (
        "-created_at",
    )

    date_hierarchy = "created_at"

    list_per_page = 30

    save_on_top = True

    actions = (
        "mark_as_new",
        "mark_as_contacted",
        "mark_as_closed",
    )

    fieldsets = (
        (
            "Customer Information",
            {
                "fields": (
                    "full_name",
                    "email",
                    "phone",
                ),
            },
        ),
        (
            "Quote Request",
            {
                "fields": (
                    "message",
                ),
            },
        ),
        (
            "Request Status",
            {
                "fields": (
                    "status",
                    "created_at",
                ),
            },
        ),
    )

    # =====================================================
    # EMAIL
    # =====================================================

    def email_link(self, obj):
        return format_html(
            '<a href="mailto:{}">{}</a>',
            obj.email,
            obj.email,
        )

    email_link.short_description = "Email"
    email_link.admin_order_field = "email"

    # =====================================================
    # PHONE
    # =====================================================

    def phone_link(self, obj):
        return format_html(
            '<a href="tel:{}">{}</a>',
            obj.phone,
            obj.phone,
        )

    phone_link.short_description = "Phone"
    phone_link.admin_order_field = "phone"

    # =====================================================
    # MESSAGE PREVIEW
    # =====================================================

    def message_preview(self, obj):
        if not obj.message:
            return "—"

        return Truncator(obj.message).chars(70)

    message_preview.short_description = "Project Details"

    # =====================================================
    # STATUS BADGE
    # =====================================================

    def status_badge(self, obj):
        styles = {
            "new": {
                "background": "#f97316",
                "color": "#ffffff",
                "label": "NEW",
            },
            "contacted": {
                "background": "#2563eb",
                "color": "#ffffff",
                "label": "CONTACTED",
            },
            "closed": {
                "background": "#16a34a",
                "color": "#ffffff",
                "label": "CLOSED",
            },
        }

        style = styles.get(
            obj.status,
            {
                "background": "#6b7280",
                "color": "#ffffff",
                "label": obj.status.upper(),
            },
        )

        return format_html(
            """
            <span style="
                display:inline-block;
                padding:5px 10px;
                border-radius:999px;
                background:{};
                color:{};
                font-size:11px;
                font-weight:700;
                letter-spacing:0.04em;
            ">
                {}
            </span>
            """,
            style["background"],
            style["color"],
            style["label"],
        )

    status_badge.short_description = "Status"
    status_badge.admin_order_field = "status"

    # =====================================================
    # ADMIN ACTIONS
    # =====================================================

    @admin.action(description="Mark selected requests as NEW")
    def mark_as_new(self, request, queryset):
        updated = queryset.update(status="new")

        self.message_user(
            request,
            f"{updated} quote request(s) marked as New.",
        )

    @admin.action(description="Mark selected requests as CONTACTED")
    def mark_as_contacted(self, request, queryset):
        updated = queryset.update(status="contacted")

        self.message_user(
            request,
            f"{updated} quote request(s) marked as Contacted.",
        )

    @admin.action(description="Mark selected requests as CLOSED")
    def mark_as_closed(self, request, queryset):
        updated = queryset.update(status="closed")

        self.message_user(
            request,
            f"{updated} quote request(s) marked as Closed.",
        )


admin.site.site_header = "INCO Windows & Doors"
admin.site.site_title = "INCO Admin"
admin.site.index_title = "Website Administration"