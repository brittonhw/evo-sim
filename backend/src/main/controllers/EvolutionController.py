from src.main.service.dto.EvolutionRequestDTO import EvolutionRequestDTO
from src.main.service.dto.EvolutionResponseDTO import EvolutionResponseDTO
from src.main.service.dto.AnimationRequestDTO import AnimationRequestDTO
from src.main.service.dto.AnimationResponseDTO import AnimationResponseDTO
from src.main.service.EvolutionService import EvolutionService
from fastapi import APIRouter
from src.main.utils.Logger import logger

router = APIRouter(tags=["Evolution Controller"])

evolution_service = EvolutionService()


@router.get(
    "/",
    name="get an evolution by id",
    description="get an evolution by id"
)
async def get_evolution(evolution_id: str) -> EvolutionResponseDTO:
    logger.info("retrieving evolution by id %s", evolution_id)


@router.post(
    "/start",
    name="start an evolution",
    description="starts an evolution"
)
async def start_evolution(evolution_request: EvolutionRequestDTO) -> EvolutionResponseDTO:
    logger.info("starting evolution for gameboard_id %s", evolution_request.gameboard_id)

    ev_response = EvolutionResponseDTO()
    return ev_response


@router.get(
    "/animation",
    name="get an animation",
    description="gets an animation"
)
async def get_animation(animation_request: AnimationRequestDTO) -> AnimationResponseDTO:
    logger.info("getting animation for lifecycle_id %s", animation_request.lifecycle_id)

    animation_response = AnimationResponseDTO()
    animation_response.lifecycle_id = animation_request.lifecycle_id

    return animation_response
