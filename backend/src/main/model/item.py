from typing import Optional
from pydantic import BaseModel


class Item(BaseModel):
    name: Optional[str]
    price: Optional[int]
