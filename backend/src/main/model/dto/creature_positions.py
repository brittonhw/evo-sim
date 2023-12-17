from typing import List
from pydantic import BaseModel


class CreaturePositionsDTO(BaseModel):
    creature_id: int = 1234
    position_data: List[tuple[int, int]] = [(3, 3), (3, 4), (4, 4)]  # (x, y)
