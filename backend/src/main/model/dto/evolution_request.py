from typing import List, Optional
from pydantic import BaseModel, Field


class EvolutionRequestDTO(BaseModel):
    gameboard_id: str = Field(..., example='abc123')
    evolution_id: Optional[str]  # for re-running a specific evolution
    lifecycles: int
    save_intervals: List[int]
