from typing import List, Optional

from pydantic import BaseModel, Field

from src.main.service.enum.enums import GameboardSize
from src.main.utils.sample_gameboards.sample_gameboard import get_sample_gameboard

example_gameboard_data = get_sample_gameboard()


class GameboardDTO(BaseModel):
    id: Optional[str] = Field(None, example="abc123")
    size: GameboardSize = Field(..., example=GameboardSize.MED)
    data: Optional[List[List[int]]]
