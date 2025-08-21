from dto.get_recipe_input import GetRecipeInput
from dto.get_recipe_output import GetRecipeOutput, GetRecipePlanningInput, GetRecipePlanningOutput
from applications.services.recipe_service import GetRecipeService

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # adapte
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/get-recipe/", response_model=GetRecipeOutput)
def get_recipes(input: GetRecipeInput):
    return GetRecipeService.GetRecipeFromIngredients(input.ingredients)

@app.post("/get-recipe-planing", response_model=GetRecipePlanningOutput)
def get_recipes_planning(input: GetRecipePlanningInput):
    return GetRecipeService.GetRecipeFromIngredients(input.ingredients)
