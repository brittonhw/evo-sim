from typing import List
from pydantic import BaseModel


class CreaturePositionsDTO(BaseModel):
    creature_id: str = "abc123"
    position_data: List[tuple[int, int]] = [(3, 3), (3, 4), (4, 4)] # (x, y)


