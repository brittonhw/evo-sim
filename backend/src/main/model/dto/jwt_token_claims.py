from datetime import datetime
from typing import List

from pydantic import BaseModel


class JWTTokenClaims(BaseModel):
    session_id: str
    board_ids: List[str]
    active_boards: List[str]
    exp: datetime
