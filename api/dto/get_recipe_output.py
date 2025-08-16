from pydantic import BaseModel, Field
from dto.Recipe import Recipe

class GetRecipeOutput(BaseModel):
    recipes: list[Recipe] = Field(default_factory=list)
