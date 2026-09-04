from pydantic import BaseModel
from typing import List, Optional


# --- ORDER SCHEMAS ---
class OrderItemCreate(BaseModel):
    variant_id: int
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
# --- CATEGORY SCHEMAS ---
class CategoryBase(BaseModel):
    name: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    id: int

    # This tells Pydantic to read data even if it is an ORM model, not a dict
    class Config:
        from_attributes = True

# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    base_price: float
    category_id: int
    image_url: Optional[str] = None  # ADD THIS LINE
    

class ProductCreate(ProductBase):
    pass

class ProductResponse(ProductBase):
    id: int
    category: CategoryResponse

    class Config:
        from_attributes = True
        
# Add this to the bottom of your schemas.py file
from pydantic import BaseModel, EmailStr

# --- USER SCHEMAS ---
class UserBase(BaseModel):
    # Using EmailStr ensures the user provides a valid email format
    email: str 

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Add this to the bottom of schemas.py

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    
class OrderItemCreate(BaseModel):
    product_id: int  # <-- Changed from variant_id
    quantity: int

class OrderCreate(BaseModel):
    address: str
    city: str
    total_amount: float
    items: List[OrderItemCreate]
    
    