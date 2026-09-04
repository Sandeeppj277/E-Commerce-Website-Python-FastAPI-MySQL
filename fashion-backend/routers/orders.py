from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
import models, schemas
from database import get_db
from security import get_current_user 
import time

router = APIRouter(prefix="/api/orders", tags=["Orders"])

@router.post("/")
def create_order(
    order: schemas.OrderCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    # 1. Create the main Order record
    new_order = models.Order(
        user_id=current_user.id,
        total_amount=order.total_amount,
        status="Processing",
        created_at=datetime.utcnow()
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order) 

    # 2. Create the Order Items
    for item in order.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product:
            continue
            
        variant = db.query(models.ProductVariant).filter(models.ProductVariant.product_id == product.id).first()
        
        # FIX: Auto-create a default variant if none exists so we don't lose the product link!
        if not variant:
            variant = models.ProductVariant(
                product_id=product.id,
                sku=f"DEFAULT-SKU-{product.id}-{int(time.time())}",
                size="One Size",
                color="Standard"
            )
            db.add(variant)
            db.commit()
            db.refresh(variant)
        
        new_item = models.OrderItem(
            order_id=new_order.id,
            variant_id=variant.id,
            quantity=item.quantity,
            price_at_purchase=product.base_price
        )
        db.add(new_item)

    db.commit()
    return {"message": "Order placed successfully", "order_id": new_order.id}


@router.get("/")
def get_my_orders(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    orders = db.query(models.Order).filter(
        models.Order.user_id == current_user.id
    ).order_by(models.Order.created_at.desc()).all()
    
    history = []
    for order in orders:
        items_list = []
        for item in order.items:
            # FIX: Fetch the actual product name instead of the ID
            if item.variant and item.variant.product:
                product_name = item.variant.product.name
            else:
                product_name = "Unknown Product"
            
            items_list.append({
                "id": item.id,
                "product_name": product_name, # Sending the name to the frontend
                "quantity": item.quantity,
                "price_at_purchase": item.price_at_purchase
            })
            
        history.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items": items_list
        })
        
    return history