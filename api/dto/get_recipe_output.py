from pydantic import BaseModel, Field
from dto.Recipe import Recipe

class GetRecipeOutput(BaseModel):
    recipes: list[Recipe] = Field(default_factory=list)

class GetRecipePlanningInput(BaseModel):
    givendates: str = Field(default_factory=str)
    perioderepas: str = Field(default_factory=str)
    allergies: str = Field(default_factory=str)
    wishedingredients: str = Field(default_factory=str)
    city: str = Field(default_factory=str)

class FoodPlanning(BaseModel):
    periodeRepas: str = Field(default_factory=str)
    recipe: Recipe

class PlanningOfDay(BaseModel):
    day: str
    foods: list[FoodPlanning] = Field(default_factory=list)

class GetRecipePlanningOutput(BaseModel):
    planning: list[PlanningOfDay] = Field(default_factory=list)

