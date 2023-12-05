from pydantic import BaseModel


class AnimationRequestDTO(BaseModel):
    lifecycle_id: str