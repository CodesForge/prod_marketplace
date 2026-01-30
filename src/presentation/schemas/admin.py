from pydantic import BaseModel, Field

class AdminSchema(BaseModel):
    username: str = Field(
        min_length=5,
        max_length=32,
        pattern=r"^[a-zA-Z0-9_-]+$",
        description="Уникальное имя админа",
        examples=["Admin_admin"]
    )
    password: str = Field(
        min_length=8,
        max_length=32,
        description="Пароль админа",
        examples=["NqZ–f8BjLAT7.$?"]
    )