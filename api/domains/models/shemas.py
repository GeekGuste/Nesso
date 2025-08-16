GetRecipeSchema = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "recipes": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "recipeName":  {"type": "string"},
                    "ingredients": {"type": "array", "items": {"type": "string"}},
                    "preparation": {"type": "string"},
                    "cookingTime": {"type": "string"},
                },
                "required": ["recipeName", "ingredients", "preparation", "cookingTime"]
            }
        }
    },
    "required": ["recipes"]
}