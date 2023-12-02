from typing import List, Optional
from pydantic import BaseModel


class AnimationRequestDTO(BaseModel):
    lifecycle_id: str