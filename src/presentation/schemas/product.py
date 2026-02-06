from pydantic import BaseModel, Field

class ProductSchema(BaseModel):
   title: str = Field(min_length=3, max_length=100)
   description: str = Field(min_length=10, max_length=2000)
   price: str
