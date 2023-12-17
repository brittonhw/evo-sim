import random

from src.main.model.dto.animation_data import AnimationData
from src.main.utils.evolution_util import move_random_direction
from src.main.utils.position_encoding.encoder import convert_animation_data_to_bytes
from src.main.model.dto.creature_positions import CreaturePositionsDTO
from src.main.model.enum.enums import GameboardSize
from src.main.utils.logger import logger


class EvolutionService:
    def start_evolution(self) -> None:
        logger.warn("not implemented")

    def get_evolution_status(self) -> None:
        logger.warn("not implemented")

    def get_animation(self) -> None:
        logger.warn("not impl")

    def get_animation_data_example(
        self,
        population_size: int = 10,
        gameboard_size: GameboardSize = GameboardSize.XL,
        lifecycle_steps: int = 200,
    ) -> AnimationData:
        creature_positions_list = []

        for i in range(population_size):
            creature_positions_dto = CreaturePositionsDTO(creature_id=i)
            last_position: tuple[int, int] = random.randrange(
                0, gameboard_size
            ), random.randrange(0, gameboard_size)
            positions = [last_position]
            for _ in range(lifecycle_steps - 1):
                newest_position = move_random_direction(positions[-1], gameboard_size)
                positions.append(newest_position)
            creature_positions_dto.position_data = positions
            creature_positions_list.append(creature_positions_dto)

        animation_data = AnimationData(
            steps=lifecycle_steps, creature_positions=creature_positions_list
        )
        return animation_data

    def encode_positions_to_bytes(self, animation_data: AnimationData) -> bytes:
        animation_data_bytes = convert_animation_data_to_bytes(animation_data)
        return animation_data_bytes
