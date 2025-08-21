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

GetRecipePlanningSchema = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "planning": {
            "type": "array",
            "items": {
                "type": "object",
                "additionalProperties": False,
                "properties": {
                    "day": {"type": "string"},
                    "foods": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "additionalProperties": False,
                            "properties": {
                                "periodeRepas": {"type": "string"},
                                "recipe": {
                                    "type": "object",
                                    "additionalProperties": False,
                                    "properties": {
                                        "recipeName": {"type": "string"},
                                        "ingredients": {"type": "array", "items": {"type": "string"}},
                                        "preparation": {"type": "string"},
                                        "cookingTime": {"type": "string"},
                                    },
                                    "required": ["recipeName", "ingredients", "preparation", "cookingTime"]
                                }
                            },
                            "required": ["periodeRepas", "recipe"]
                        }
                    }
                },
                "required": ["day", "foods"]
            }
        }
    },
    "required": ["planning"]
}
