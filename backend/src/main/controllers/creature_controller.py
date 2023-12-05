from typing import List
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from src.main.service.evolution_service import EvolutionService
from src.main.model.dto.creature_positions import CreaturePositionsDTO
from src.main.model.enum.enums import GameboardSize
from src.main.utils.logger import logger

router = APIRouter(tags=["Creature Controller"])

evolution_service = EvolutionService()


@router.post(
    "/population-positions/example",
    name="gets example positions of a whole population",
    description="set the population size and gameboard size, and return \
      example position data for the entire population. by default, the \
        creatures will start on the left half of the screen and gradually make their way to the right.",
)
async def population_positions_example(
    population_size: int = 10,
    gameboard_size: GameboardSize = GameboardSize.XL,
    lifecycle_steps: int = 200,
) -> List[CreaturePositionsDTO]:
    return evolution_service.get_population_positions_example(
        population_size, gameboard_size, lifecycle_steps
    )


@router.get(
    "/population-positions/bytes",
    name="gets positions of a whole population, bytes",
    description="response array format: \n [lifecycle_steps][creature_id][positions]\n\
        for all creatures. lifecyle_steps and creature id are 2 bytes \
        digit integer, and each position is 2 integers (0-255)",
)
async def get_population_positions_encoded() -> StreamingResponse:
    creatures_data = evolution_service.get_population_positions_example(
        1000, GameboardSize.XL, 300
    )
    data_bytes = evolution_service.encode_positions_to_bytes(300, creatures_data)
    response = StreamingResponse(
        iter([data_bytes]), media_type="application/octet-stream"
    )
    response.headers["Content-Length"] = str(len(data_bytes))
    logger.info("returning encoded positions with bytes len %d", len(data_bytes))
    return response
