from typing import List
from fastapi import APIRouter
from src.main.model.dto.CreaturePositionsDTO import CreaturePositionsDTO
from src.main.model.enum.enums import GameboardSize
from src.main.utils.Logger import logger
import random

router = APIRouter(tags=["Creature Controller"])


@router.post(
    '/population-positions/example',
    name="gets example positions of a whole population",
    description="set the population size and gameboard size, and return \
      example position data for the entire population. by default, the \
        creatures will start on the left half of the screen and gradually make their way to the right."
)
async def population_positions_example(population_size: int = 10, gameboard_size: GameboardSize = GameboardSize.XL,
                                       lifecycle_steps: int = 200) -> List[CreaturePositionsDTO]:

    creature_positions_list = []

    for i in range(population_size):
        creature_positions_dto = CreaturePositionsDTO(creature_id="abc" + str(i))
        last_position: tuple[int, int] = (random.randrange(0, gameboard_size // 2), random.randrange(0, gameboard_size))
        positions = [last_position]
        for _ in range(lifecycle_steps):
            newest_position = (positions[-1][0] + 1, positions[-1][1])
            positions.append(newest_position)
        creature_positions_dto.position_data = positions
        creature_positions_list.append(creature_positions_dto)

    return creature_positions_list



