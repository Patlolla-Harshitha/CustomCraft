from decimal import Decimal
from sqlalchemy.orm import Session
from app.models.product import Product

SAMPLE_PRODUCTS = [
    {
        "name": "Custom T-Shirt",
        "category": "T-Shirts",
        "base_price": Decimal("499.00"),
        "description": "Premium 100% combed cotton t-shirt engineered for vibrant custom digital printing and embroidery.",
        "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80",
        "is_active": True,
    },
    {
        "name": "Custom Hoodie",
        "category": "Hoodies",
        "base_price": Decimal("999.00"),
        "description": "Cozy fleece custom pullover hoodie crafted with durable stitching, ideal for custom designs.",
        "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
        "is_active": True,
    },
    {
        "name": "Custom Coffee Mug",
        "category": "Mugs",
        "base_price": Decimal("299.00"),
        "description": "High-grade 11oz ceramic mug with glossy white finish, perfect for custom photos and logos.",
        "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80",
        "is_active": True,
    },
    {
        "name": "Custom Phone Case",
        "category": "Phone Cases",
        "base_price": Decimal("399.00"),
        "description": "Slim, impact-resistant polycarbonate phone case designed for full-wrap custom artwork printing.",
        "image_url": "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&auto=format&fit=crop&q=80",
        "is_active": True,
    },
    {
        "name": "Custom Tote Bag",
        "category": "Bags",
        "base_price": Decimal("449.00"),
        "description": "Heavy-duty eco-friendly cotton canvas tote bag with reinforced handles for everyday custom style.",
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80",
        "is_active": True,
    },
]


def seed_products(db: Session):
    """Safely seeds sample products if they do not already exist in the database."""
    for prod_data in SAMPLE_PRODUCTS:
        existing = db.query(Product).filter(Product.name == prod_data["name"]).first()
        if not existing:
            product = Product(**prod_data)
            db.add(product)
    db.commit()
