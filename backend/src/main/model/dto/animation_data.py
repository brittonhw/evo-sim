from typing import List
from pydantic import BaseModel

from src.main.model.dto.creature_positions import CreaturePositionsDTO


class AnimationData(BaseModel):
    steps: int
    creature_positions: List[CreaturePositionsDTO]