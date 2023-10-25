from typing import List, Optional
from pydantic import BaseModel, Field
from src.main.utils.encoders.drawing_encoder import encode_gameboard_data

from src.main.service.enum.enums import GameboardSize

from src.main.utils.sample_gameboards.sample_gameboard import get_sample_gameboard


example_gameboard_data = get_sample_gameboard()
example_gameboard_data_encoded = encode_gameboard_data(example_gameboard_data)

class GameboardDTO(BaseModel):
    id: Optional[str] = Field(None, example="abc123")
    size: GameboardSize = Field(..., example = GameboardSize.MED)
    data: Optional[List[List[int]]]
    encoded_data: Optional[List[int]] = Field(None, example = example_gameboard_data_encoded)