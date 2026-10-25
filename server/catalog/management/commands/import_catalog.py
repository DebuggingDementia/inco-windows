from pathlib import Path

from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand

from catalog.models import (
    Category,
    Product,
    ProductImage,
    ProductBenefit,
    ProductFAQ,
)


WINDOW_PRODUCTS = [
    {
        "slug": "casement",
        "title": "Casement Windows",
        "short": "Side-hinged windows that open outward with a crank for controlled ventilation.",
        "description": "A casement window swings outward from one side. Its full opening is useful where generous airflow and a clear view are priorities.",
        "image": "/images/window-styles/Casement Window .png",
        "gallery": [
            "/images/window-products/Casments Window (Mix Size).png",
        ],
        "benefits": [
            "Wide ventilation opening",
            "Unobstructed outward view",
            "Simple crank operation",
        ],
    },
    {
        "slug": "awning",
        "title": "Awning Windows",
        "short": "Top-hinged windows that open outward from the bottom.",
        "description": "An awning window creates a sheltered opening that can support ventilation while helping keep light rain outside. It suits spaces where a compact horizontal opening is useful.",
        "image": "/images/window-styles/Awning Window.png",
        "gallery": [
            "/images/window-products/Awning Windows (Mix Size).png",
        ],
        "benefits": [
            "Ventilation in light rain",
            "Useful for higher wall positions",
            "Compact outward operation",
        ],
    },
    {
        "slug": "hopper",
        "title": "Hopper Windows",
        "short": "Bottom-hinged windows designed to tilt inward from the top.",
        "description": "A hopper window opens inward, making it a practical choice for compact spaces. Its operation provides focused ventilation without an exterior swing.",
        "image": None,
        "gallery": [],
        "benefits": [
            "Compact operation",
            "Focused ventilation",
            "Useful in lower-level spaces",
        ],
    },
    {
        "slug": "fixed-picture",
        "title": "Fixed / Picture Windows",
        "short": "Non-opening windows designed around daylight and uninterrupted views.",
        "description": "A fixed or picture window has no operating sash. It is commonly used where natural light, a broad view, or a clean architectural composition matters more than ventilation.",
        "image": "/images/window-styles/Picture Window 1.png",
        "gallery": [
            "/images/window-products/Picture Window.png",
        ],
        "benefits": [
            "Unobstructed views",
            "Generous natural light",
            "Clean architectural profile",
        ],
    },
    {
        "slug": "single-hung",
        "title": "Single Hung Windows",
        "short": "A classic vertical window with one operating sash.",
        "description": "A single hung window opens vertically through one movable sash while the other remains fixed. It offers familiar operation in a space-conscious format.",
        "image": "/images/window-styles/Single Hung.png",
        "gallery": [
            "/images/window-products/Single Hung (Mix Size).png",
        ],
        "benefits": [
            "Space-saving vertical operation",
            "Classic appearance",
            "Straightforward ventilation",
        ],
    },
    {
        "slug": "double-hung",
        "title": "Double Hung Windows",
        "short": "A vertical window with two operating sashes for flexible airflow.",
        "description": "Both sashes in a double hung window can move, allowing ventilation to be adjusted from the upper or lower portion of the opening.",
        "image": "/images/window-products/Double Hung.png",
        "gallery": [
            "/images/window-products/Double Hung (Mix Size).png",
        ],
        "benefits": [
            "Flexible upper and lower airflow",
            "Traditional proportions",
            "No exterior swing",
        ],
    },
    {
        "slug": "single-slider",
        "title": "Single Slider Windows",
        "short": "A horizontal window with one sliding sash and one fixed sash.",
        "description": "A single slider opens side to side along its frame. It is useful for wide openings and locations where an outward-swinging sash is not desirable.",
        "image": "/images/window-styles/Single Slider.png",
        "gallery": [
            "/images/window-products/Single Slider (Mix Size).png",
        ],
        "benefits": [
            "Space-saving operation",
            "Suited to wide openings",
            "Simple horizontal movement",
        ],
    },
    {
        "slug": "double-slider",
        "title": "Double Slider Windows",
        "short": "A horizontal window with two sliding sashes.",
        "description": "A double slider allows both sashes to move horizontally, offering more flexible access and ventilation than a single slider.",
        "image": "/images/window-products/Double Slider .png",
        "gallery": [
            "/images/window-products/Double Slider ( Mix Size).png",
        ],
        "benefits": [
            "Flexible side-to-side airflow",
            "Two movable sashes",
            "No exterior projection",
        ],
    },
    {
        "slug": "end-vent-slider",
        "title": "End Vent Slider Windows",
        "short": "A wide horizontal configuration with operating end sections.",
        "description": "An end vent slider combines a broad central view with ventilation from operating sections at the ends. It is designed for wider wall openings.",
        "image": None,
        "gallery": [],
        "benefits": [
            "Ventilation from both ends",
            "Broad central view",
            "Well suited to wide openings",
        ],
    },
    {
        "slug": "bay",
        "title": "Bay Windows",
        "short": "An angular projection that extends beyond the exterior wall.",
        "description": "A bay window combines multiple window sections to project outward from the home. Its angled form can create a deeper interior ledge and expanded sightlines.",
        "image": "/images/window-styles/Bay Window.png",
        "gallery": [],
        "benefits": [
            "Expanded interior space",
            "Wider viewing angles",
            "Strong architectural presence",
        ],
    },
    {
        "slug": "bow",
        "title": "Bow Windows",
        "short": "A gently curved projection composed of multiple window sections.",
        "description": "A bow window uses several sections to create a rounded projection. The softer curve brings in light from multiple directions and creates panoramic views.",
        "image": "/images/window-products/Bow Window.png",
        "gallery": [],
        "benefits": [
            "Panoramic outlook",
            "Soft curved appearance",
            "Light from multiple directions",
        ],
    },
    {
        "slug": "tilt-turn",
        "title": "Tilt & Turn Windows",
        "short": "Dual-operation windows that tilt inward or swing inward from the side.",
        "description": "A tilt and turn window supports two opening modes: a top tilt for controlled ventilation and an inward side swing for a wider opening.",
        "image": "/images/window-styles/Turn and Tilt 1.png",
        "gallery": [
            "/images/window-products/Tilt and Turn 2.png",
        ],
        "benefits": [
            "Two opening modes",
            "Controlled ventilation",
            "Convenient inward access",
        ],
    },
    {
        "slug": "architectural-specialty-shape",
        "title": "Architectural / Specialty Shape Windows",
        "short": "Custom geometric windows for distinctive architectural openings.",
        "description": "Specialty shape windows may follow arches, circles, triangles, or other geometric forms. They add light and visual character where a standard rectangle is not the right fit.",
        "image": "/images/window-products/Sahpe Window (Mix).png",
        "gallery": [
            "/images/window-products/shape window 1.png",
            "/images/window-products/shape window 2.png",
            "/images/window-products/Shape window 3.png",
        ],
        "benefits": [
            "Distinctive architectural detail",
            "Supports geometric openings",
            "Adds light in custom spaces",
        ],
    },
    {
        "slug": "basement-egress",
        "title": "Basement Egress Windows",
        "short": "Basement window configurations intended for openings with egress requirements.",
        "description": "A basement egress window is planned around the needs of a lower-level opening and applicable project requirements. Final sizing and compliance details must be confirmed for each installation.",
        "image": None,
        "gallery": [],
        "benefits": [
            "Supports lower-level access planning",
            "Brings light to basement spaces",
            "Project-specific configuration",
        ],
    },
]


DOOR_PRODUCTS = [
    {
        "slug": "steel-entry",
        "title": "Steel Entry Doors",
        "short": "A hinged exterior entrance door built around a steel-faced door system.",
        "description": "Steel entry doors are commonly used at primary and secondary home entrances where dependable everyday access is required.",
        "image": "/images/doors/Steel Door 3 Background Removed.png",
        "gallery": [
            "/images/doors/Steel Door 1 Background Removed.png",
            "/images/doors/Steel Door 2 Background Removed.png",
            "/images/doors/Steel Door 4 Background Removed.png",
        ],
        "benefits": [
            "Durable exterior surface",
            "Entry-focused security",
            "Flexible design options",
        ],
        "faq": [
            [
                "Where are steel entry doors commonly used?",
                "They are commonly used at primary and secondary exterior entrances.",
            ],
            [
                "How does a steel entry door operate?",
                "It uses a familiar hinged operation for everyday entrance access.",
            ],
        ],
    },
    {
        "slug": "fiberglass-entry",
        "title": "Fiberglass Entry Doors",
        "short": "A hinged exterior entrance door with a fiberglass-facing system.",
        "description": "Fiberglass entry doors provide a versatile entrance option for homeowners seeking durability and design flexibility with straightforward upkeep.",
        "image": "/images/doors/FB Glass 2 Background Removed.png",
        "gallery": [
            "/images/doors/FB Glass 1 Background Removed.png",
            "/images/doors/FB Glass 3 Background Removed.png",
        ],
        "benefits": [
            "Low-maintenance exterior",
            "Design flexibility",
            "Durable everyday entrance",
        ],
        "faq": [
            [
                "What distinguishes a fiberglass entry door?",
                "It uses a fiberglass-facing system suited to a versatile exterior entrance.",
            ],
            [
                "Where can fiberglass entry doors be used?",
                "They can be considered for primary or secondary hinged exterior entrances.",
            ],
        ],
    },
    {
        "slug": "sliding-patio",
        "title": "Sliding Patio Doors",
        "short": "Large glazed door panels that open horizontally along a track.",
        "description": "Sliding patio doors connect indoor living areas with decks, patios, and backyards while avoiding the floor-space requirements of a swinging door.",
        "image": "/images/doors/Sliding door 1 Background Removed.png",
        "gallery": [
            "/images/doors/Slididng door Background Removed.png",
        ],
        "benefits": [
            "Space-efficient operation",
            "Broad glass area and daylight",
            "Convenient outdoor access",
        ],
        "faq": [
            [
                "How does a sliding patio door open?",
                "The operating panel moves horizontally along its track.",
            ],
            [
                "Does a sliding patio door require swing space?",
                "Its sliding operation avoids the floor-space needs of a hinged door.",
            ],
        ],
    },
    {
        "slug": "garden",
        "title": "Garden Doors",
        "short": "Hinged glazed exterior doors for direct access to outdoor living spaces.",
        "description": "Garden doors use swinging panels to connect a room with a garden, patio, or deck while bringing natural light into the interior.",
        "image": "/images/doors/Garden Door 1 Background Removed.png",
        "gallery": [
            "/images/doors/Garden Door 2 Background Removed.png",
            "/images/doors/Garden Door 3 Background Removed.png",
            "/images/doors/Graden Door 4 Background Removed.png",
        ],
        "benefits": [
            "Traditional hinged access",
            "Natural light",
            "Strong indoor-outdoor connection",
        ],
        "faq": [
            [
                "Where are garden doors commonly used?",
                "They commonly connect interior living areas with a garden, patio, or deck.",
            ],
            [
                "How does a garden door operate?",
                "It uses a traditional hinged swinging operation.",
            ],
        ],
    },
    {
        "slug": "double",
        "title": "Double Doors",
        "short": "A paired hinged-door configuration that creates a wider entrance.",
        "description": "Double doors use two coordinated panels to create a broad opening. They are commonly selected for prominent entrances or spaces needing wider access.",
        "image": "/images/doors/DOUBLE DOOR 1 Background Removed.png",
        "gallery": [
            "/images/doors/DOUBLE DOOR 2 Background Removed.png",
            "/images/doors/DOUBLE DOOR 3 Background Removed.png",
        ],
        "benefits": [
            "Wider clear opening",
            "Balanced architectural presence",
            "Flexible entrance planning",
        ],
        "faq": [
            [
                "What is a double-door configuration?",
                "It is a coordinated pair of hinged door panels forming one broader entrance.",
            ],
            [
                "Where can double doors be useful?",
                "They suit prominent entrances and projects that benefit from wider access.",
            ],
        ],
    },
    {
        "slug": "vented",
        "title": "Vented Doors",
        "short": "An exterior door configuration designed to support controlled ventilation.",
        "description": "Vented doors incorporate an operable ventilation feature while maintaining the function of an exterior entrance. Final configurations depend on the selected product.",
        "image": "/images/doors/VENTED DOOR 1 Background Removed.png",
        "gallery": [
            "/images/doors/Vanted door 2 Background Removed.png",
        ],
        "benefits": [
            "Flexible airflow",
            "Exterior access and ventilation",
            "Product-specific configuration options",
        ],
        "faq": [
            [
                "What is the purpose of a vented door?",
                "It combines exterior access with an operable feature for controlled airflow.",
            ],
            [
                "Are all vented-door configurations the same?",
                "No. Final configuration and availability depend on the selected product.",
            ],
        ],
    },
]


class Command(BaseCommand):
    help = "Import the existing INCO frontend catalog into Django."

    def handle(self, *args, **options):
        public_dir = settings.BASE_DIR.parent / "public"

        if not public_dir.exists():
            self.stderr.write(
                self.style.ERROR(
                    f"Frontend public directory not found: {public_dir}"
                )
            )
            return

        windows_category, _ = Category.objects.update_or_create(
            slug="windows",
            defaults={
                "name": "Windows",
                "product_type": "window",
                "order": 1,
                "is_active": True,
            },
        )

        doors_category, _ = Category.objects.update_or_create(
            slug="doors",
            defaults={
                "name": "Doors",
                "product_type": "door",
                "order": 2,
                "is_active": True,
            },
        )

        self.import_products(
            products=WINDOW_PRODUCTS,
            category=windows_category,
            public_dir=public_dir,
        )

        self.import_products(
            products=DOOR_PRODUCTS,
            category=doors_category,
            public_dir=public_dir,
        )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "Catalog import completed successfully."
            )
        )

    def import_products(
        self,
        products,
        category,
        public_dir: Path,
    ):
        for index, data in enumerate(products, start=1):
            product, created = Product.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "category": category,
                    "title": data["title"],
                    "short_description": data["short"],
                    "description": data["description"],
                    "order": index,
                    "is_published": True,
                },
            )

            action = "Created" if created else "Updated"

            self.stdout.write(
                f"{action}: {product.title}"
            )

            self.import_hero_image(
                product=product,
                image_path=data.get("image"),
                public_dir=public_dir,
            )

            ProductBenefit.objects.filter(
                product=product
            ).delete()

            for benefit_index, benefit in enumerate(
                data.get("benefits", []),
                start=1,
            ):
                ProductBenefit.objects.create(
                    product=product,
                    text=benefit,
                    order=benefit_index,
                )

            ProductFAQ.objects.filter(
                product=product
            ).delete()

            for faq_index, faq in enumerate(
                data.get("faq", []),
                start=1,
            ):
                question, answer = faq

                ProductFAQ.objects.create(
                    product=product,
                    question=question,
                    answer=answer,
                    order=faq_index,
                )

            ProductImage.objects.filter(
                product=product
            ).delete()

            for image_index, gallery_path in enumerate(
                data.get("gallery", []),
                start=1,
            ):
                self.import_gallery_image(
                    product=product,
                    image_path=gallery_path,
                    order=image_index,
                    public_dir=public_dir,
                )

    def get_source_file(
        self,
        public_dir: Path,
        image_path,
    ):
        if not image_path:
            return None

        relative_path = image_path.lstrip("/")

        source = public_dir / relative_path

        if not source.exists():
            self.stderr.write(
                self.style.WARNING(
                    f"Image not found: {source}"
                )
            )

            return None

        return source

    def import_hero_image(
        self,
        product,
        image_path,
        public_dir,
    ):
        source = self.get_source_file(
            public_dir,
            image_path,
        )

        if source is None:
            return

        if product.hero_image:
            product.hero_image.delete(
                save=False
            )

        with source.open("rb") as file:
            product.hero_image.save(
                source.name,
                File(file),
                save=True,
            )

    def import_gallery_image(
        self,
        product,
        image_path,
        order,
        public_dir,
    ):
        source = self.get_source_file(
            public_dir,
            image_path,
        )

        if source is None:
            return

        gallery_image = ProductImage(
            product=product,
            order=order,
            alt_text=f"{product.title} photo {order}",
        )

        with source.open("rb") as file:
            gallery_image.image.save(
                source.name,
                File(file),
                save=True,
            )