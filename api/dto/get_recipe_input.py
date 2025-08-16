from pydantic import BaseModel

class GetRecipeInput(BaseModel):
    ingredients: list[str]
