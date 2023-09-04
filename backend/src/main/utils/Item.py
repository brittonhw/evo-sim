from typing import Optional
from pydantic import BaseModel

from src.main.utils.Color import Color

class Item(BaseModel):
    name: Optional[str]
    price: Optional[int]
    color: Optional[Color]


