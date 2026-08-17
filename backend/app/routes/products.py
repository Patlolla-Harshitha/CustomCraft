from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductResponse

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    """Retrieve a list of all active products."""
    products = db.query(Product).filter(Product.is_active == True).all()
    return products


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Retrieve a single product by product ID."""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with ID {product_id} not found"
        )
    return product
