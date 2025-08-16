from dataclasses import dataclass, field
from typing import Dict, Any

@dataclass
class OpenAIPrompt:
    id: str
    version: str
    variables: Dict[str, Any] = field(default_factory=dict)
