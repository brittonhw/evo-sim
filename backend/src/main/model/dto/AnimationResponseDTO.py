from typing import List, Optional
from pydantic import BaseModel


class AnimationResponseDTO(BaseModel):
    lifecycle_id: str
    encoded_data: bytes