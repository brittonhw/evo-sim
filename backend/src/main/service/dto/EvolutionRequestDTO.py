from typing import List, Optional
from pydantic import BaseModel


class EvolutionRequestDTO(BaseModel):
    gameboard_id: str
    evolution_id: Optional[str] # for re-running a specific evolution
    lifecycles: int
    save_intervals: List[int]
