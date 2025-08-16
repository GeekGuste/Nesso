from pydantic import BaseModel

class Recipe(BaseModel):
    recipeName: str
    ingredients: list[str]
    preparation: str
    cookingTime: str
