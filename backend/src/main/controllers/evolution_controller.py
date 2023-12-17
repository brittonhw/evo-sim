from fastapi import APIRouter

from src.main.model.dto.evolution_request import EvolutionRequestDTO
from src.main.model.dto.evolution_response import EvolutionResponseDTO
from src.main.service.evolution_service import EvolutionService
from src.main.utils.logger import logger


router = APIRouter(tags=["Evolution Controller"])

evolution_service = EvolutionService()


@router.get("/", name="get an evolution by id", description="get an evolution by id")
async def get_evolution(evolution_id: str) -> EvolutionResponseDTO:
    logger.info("retrieving evolution by id %s", evolution_id)


@router.post("/start", name="start an evolution", description="starts an evolution")
async def start_evolution(
    evolution_request: EvolutionRequestDTO,
) -> EvolutionResponseDTO:
    logger.info(
        "starting evolution for gameboard_id %s", evolution_request.gameboard_id
    )

    ev_response = EvolutionResponseDTO()
    return ev_response
