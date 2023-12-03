import random
from typing import List
from src.main.utils.evolution_util import move_random_direction
from src.main.utils.encoder_util import convert_creature_position_list_to_bytes
from src.main.model.dto.CreaturePositionsDTO import CreaturePositionsDTO
from src.main.model.enum.enums import GameboardSize
from src.main.game_logic.Gameboard import Gameboard
from src.main.utils.Logger import logger

BYTES_FOR_STEPS = 2


class EvolutionService:

    def start_evolution(self) -> None:
        logger.warn("not implemented")

    def get_evolution_status(self) -> None:
        logger.warn("not implemented")

    def get_animation(self) -> None:
        logger.warn("not impl")

    def get_population_positions_example(self, population_size: int = 10, gameboard_size: GameboardSize = GameboardSize.XL,
                                       lifecycle_steps: int = 200) -> List[CreaturePositionsDTO]:

        creature_positions_list = []

        for i in range(population_size):
            creature_positions_dto = CreaturePositionsDTO(creature_id=i)
            last_position: tuple[int, int] = random.randrange(0, gameboard_size // 4), random.randrange(0, gameboard_size // 4)
            positions = [last_position]
            for _ in range(lifecycle_steps - 1):
                newest_position = move_random_direction(positions[-1], gameboard_size)
                positions.append(newest_position)
            creature_positions_dto.position_data = positions
            creature_positions_list.append(creature_positions_dto)

        return creature_positions_list
    
    def encode_positions_to_bytes(self, steps: int, creatures_data: List[CreaturePositionsDTO]) -> bytes:

        if not 0 < steps < 2 ** (8 * BYTES_FOR_STEPS) :
            raise ValueError("not enough bytes to represent steps!")
        
        steps_bytes = steps.to_bytes(BYTES_FOR_STEPS, 'big')
        creature_positions_bytes = convert_creature_position_list_to_bytes(creatures_data)
        return steps_bytes + creature_positions_bytes



