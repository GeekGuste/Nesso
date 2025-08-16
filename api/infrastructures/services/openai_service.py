from openai import OpenAI
from infrastructures.settings import settings
from domains.models.openai_prompt import OpenAIPrompt

class OpenAIService:
    def get_request_response(prompt: OpenAIPrompt, jsonSchema: str) -> str:
        """
        Envoie une requête à l'API OpenAI et retourne la réponse.
        
        :param prompt: Le texte à envoyer à l'API.
        :param model: Le modèle OpenAI à utiliser.
        :return: La réponse de l'API sous forme de dictionnaire.
        """
        client = OpenAI(api_key=settings.OPEN_API_KEY)
        response = client.responses.create(
            model="gpt-5-mini",
            prompt= {
                "id": prompt.id,
                "version": prompt.version,
                "variables": prompt.variables
            },
            #text={"format": {"type": "text"}},
            text={"format": { "type": "json_schema", "name": "recipes", "schema": jsonSchema, "strict": True }},
            max_output_tokens=1000000
        )

        return response