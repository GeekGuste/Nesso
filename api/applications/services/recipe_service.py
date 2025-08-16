from domains.models.openai_prompt import OpenAIPrompt
from infrastructures.services.openai_service import OpenAIService
from dto.get_recipe_output import GetRecipeOutput
from domains.models.shemas import GetRecipeSchema


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