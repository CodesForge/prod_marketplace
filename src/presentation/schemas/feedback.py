from pydantic import BaseModel, Field, EmailStr

class Feedback(BaseModel):
    """Feedback form payload.

    Represents a user's feedback submission, including optional contact details.
    Field metadata is used by FastAPI/OpenAPI for documentation and validation.
    """
    name: str = Field(
        min_length=3,
        max_length=32,
        description="Имя пользователя",
        examples=["Вадим"],
    )
    contact: str = Field(
        min_length=3,
        max_length=32,
        description="Телефон или email для связи (одно из двух)",
        examples=["+79991234567", "user@example.com"]
    )
    type_of_organization: str = Field(
        min_length=5,
        max_length=128,
        description="Название организации",
        examples=["ООО Тмыв денег"]
    ) 
    comment: str = Field(
        min_length=10,
        max_length=512,
        description="Комментарий от пользователя",
        examples=["Добавьте настоящую оплату на сайт"]
    )
