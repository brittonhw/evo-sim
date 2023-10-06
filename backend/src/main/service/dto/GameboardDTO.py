from typing import List, Optional
from pydantic import BaseModel


class GameboardDTO(BaseModel):
    id: str
    data: Optional[List[List[int]]]