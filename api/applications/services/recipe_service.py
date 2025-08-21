from domains.models.openai_prompt import OpenAIPrompt
from infrastructures.services.openai_service import OpenAIService
from dto.get_recipe_output import GetRecipeOutput, GetRecipePlanningInput, GetRecipePlanningOutput
from domains.models.shemas import GetRecipeSchema, GetRecipePlanningSchema


class GetRecipeService:
    def GetRecipeFromIngredients(ingredients: list[str]) -> GetRecipeOutput:
        openai_prompt = OpenAIPrompt(
            id="pmpt_68a065b5c39081948be69412a12d584101e50787f0e265ff",
            version="4",
            variables={
                "ingredients": ", ".join(ingredients)
        })
        response = OpenAIService.get_request_response(openai_prompt, GetRecipeSchema)
        raw_json = response.output_text
        #return raw_json
        return GetRecipeOutput.model_validate_json(raw_json)

    def GetRecipePlanning(input: GetRecipePlanningInput) -> GetRecipePlanningOutput:
        openai_prompt = OpenAIPrompt(
            id="pmpt_68a0acb38f248190a9a1579b697c2fa409605df446502aac",
            version="3",
            variables={
                "wishedingredients": ", ".join(input.wishedingredients),
                "givendates": input.givendates,
                "perioderepas": input.perioderepas,
                "allergies": ", ".join(input.allergies),
                "givenDates": input.givenDates,
                "city": input.city
        })
        response = OpenAIService.get_request_response(openai_prompt, GetRecipePlanningSchema)
        raw_json = response.output_text
        #return raw_json
        return GetRecipePlanningInput.model_validate_json(raw_json)