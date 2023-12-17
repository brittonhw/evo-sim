import random
import pytest


from src.main.utils.position_encoding.decoder \
    import convert_bytes_to_animation_dto
from src.main.model.dto.animation_data import AnimationData
from src.main.utils.evolution_util import move_random_direction
from src.main.model.dto.creature_positions import CreaturePositionsDTO
from src.main.utils.position_encoding.encoder \
    import convert_animation_data_to_bytes


def get_animation_data(lifecycle_steps = 400) -> AnimationData:
    gameboard_size = 256
    population_size = 3500
    creature_positions_list = []

    for i in range(population_size):
        creature_positions_dto = CreaturePositionsDTO(creature_id=i)
        last_position: tuple[int, int] = random.randrange(
            0, gameboard_size
        ), random.randrange(0, gameboard_size)
        positions = [last_position]
        for _ in range(400 - 1):
            newest_position = move_random_direction(
                positions[-1], gameboard_size)
            positions.append(newest_position)
        creature_positions_dto.position_data = positions
        creature_positions_list.append(creature_positions_dto)

    return AnimationData(
        steps=lifecycle_steps, creature_positions=creature_positions_list
    )


def test_encode_and_decode():

    animation_data = get_animation_data()
    data_bytes = convert_animation_data_to_bytes(animation_data)
    result_animation_data = convert_bytes_to_animation_dto(data_bytes)

    assert result_animation_data.steps == animation_data.steps


def test_encode_with_too_many_steps_raises_exception():
    animation_data = get_animation_data(lifecycle_steps=400000)

    try:
        convert_animation_data_to_bytes(animation_data)
        raise RuntimeError("this function should have thrown an error\
                            under test, but it did not.")
    except Exception as ex:
        assert str(ex) == 'not enough bytes to represent steps!'




