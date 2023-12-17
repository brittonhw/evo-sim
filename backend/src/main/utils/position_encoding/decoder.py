from typing import List

from src.main.model.dto.animation_data import AnimationData
from src.main.model.dto.creature_positions import CreaturePositionsDTO
from src.main.utils.logger import logger
from src.main.config.config import config

BYTES_FOR_CREATURE_ID = config['backend']['encoding']['byteLengths']['creatureId']
BYTES_FOR_STEPS = config['backend']['encoding']['byteLengths']['lifecycleSteps']

def divide_but_integer_result_required(numerator, denominator):
    result = numerator / denominator
    is_whole = result == numerator // denominator
    return result, is_whole


def calculate_steps(data_bytes):
    return int.from_bytes(data_bytes[:BYTES_FOR_STEPS], "big")


def calculate_n_creatures(steps: int, data_bytes: bytes) -> int:
    n, is_whole = divide_but_integer_result_required(
        (len(data_bytes) - BYTES_FOR_STEPS), (BYTES_FOR_CREATURE_ID + steps * 2)
    )

    if not is_whole:
        raise ValueError("couldn't find right creature length!")

    return n


def convert_bytes_to_tuple(tuple_bytes: bytes) -> tuple[int, int]:
    return (
        int.from_bytes(tuple_bytes[0:1], "big"),
        int.from_bytes(tuple_bytes[1:], "big"),
    )


def convert_bytes_to_tuple_list(tuple_list_bytes: bytes) -> List[tuple[int, int]]:
    tuple_list = [
        convert_bytes_to_tuple(tuple_list_bytes[i : i + 2])
        for i in range(0, len(tuple_list_bytes), 2)
    ]
    return tuple_list


def convert_bytes_to_creature_positions(
    creature_positions_bytes: bytes,
) -> CreaturePositionsDTO:
    creature_data = CreaturePositionsDTO()
    creature_data.creature_id = int.from_bytes(
        creature_positions_bytes[:BYTES_FOR_CREATURE_ID], "big"
    )
    creature_data.position_data = convert_bytes_to_tuple_list(
        creature_positions_bytes[BYTES_FOR_CREATURE_ID:]
    )
    return creature_data


def convert_bytes_to_creature_positions_list(
    steps: int, creature_positions_list_bytes: bytes
) -> List[CreaturePositionsDTO]:
    creature_positions_bytes_len = BYTES_FOR_CREATURE_ID + steps * 2
    creature_data_list: List[CreaturePositionsDTO] = []
    for i in range(0, len(creature_positions_list_bytes), creature_positions_bytes_len):
        creature_data_list.append(
            convert_bytes_to_creature_positions(
                creature_positions_list_bytes[i : i + creature_positions_bytes_len]
            )
        )
    return creature_data_list


def convert_bytes_to_animation_dto(data_bytes: bytes) -> AnimationData:

    steps = calculate_steps(data_bytes)

    n_creatures = calculate_n_creatures(steps, data_bytes)
    logger.info("converting an animation of %d creatures from byte data!", n_creatures)

    creature_positions = convert_bytes_to_creature_positions_list(
        steps, data_bytes[BYTES_FOR_STEPS:]
    )

    return AnimationData(steps=steps, creature_positions=creature_positions)
