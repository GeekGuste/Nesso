from typing import Union
from dto.get_recipe_input import GetRecipeInput
from dto.get_recipe_output import GetRecipeOutput
from applications.services.recipe_service import GetRecipeService

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/get-recipe/", response_model=GetRecipeOutput)
def get_recipes(input: GetRecipeInput):
    return GetRecipeService.GetRecipeFromIngredients(input.ingredients)
