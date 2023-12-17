from typing import List
from pydantic import BaseModel

from src.main.model.dto.creature_positions import CreaturePositionsDTO
from src.main.config.config import config

BYTES_FOR_STEPS = config["backend"]["encoding"]["byteLengths"][
    "lifecycleSteps"
]


class AnimationData(BaseModel):
    steps: int
    creature_positions: List[CreaturePositionsDTO]
