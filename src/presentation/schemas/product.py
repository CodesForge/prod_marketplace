from pydantic import BaseModel, Field

class ProductSchema(BaseModel):
   title: str = Field(min_length=3, max_length=100)
   description: str = Field(min_length=10, max_length=2000)
   price: str
   wb_url: str = Field(min_length=7, max_length=50)
   ozon_url: str = Field(min_length=7, max_length=50)
   market_url: str = Field(min_length=7, max_length=50)
   animal_type: str = Field(min_length=2, max_length=20)
