from typing import List
from pydantic import BaseModel

from src.main.service.enum.enums import EvolutionStatus


class EvolutionResponseDTO(BaseModel):
    gameboard_id: str
    evolution_id: str
    evolution_status: EvolutionStatus
    lifecycles: int
    lifecycles_completed: int
    lifecycles_saved: List[str] # list of lifecycle_ids ready for animating





