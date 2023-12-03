
from typing import List

from src.main.model.dto.CreaturePositionsDTO import CreaturePositionsDTO

BYTES_FOR_CREATURE_ID = 2

# each int must be (0-255). TODO add error handling? or overkill?
def convert_tuple_to_bytes(t: tuple[int, int]) -> bytes:
    return bytes(t[0].to_bytes(1, "big")) + bytes(t[1].to_bytes(1, "big"))

def convert_tuple_list_to_bytes(tuple_list: List[tuple[int, int]]) -> bytes:

    byte_chunks = [convert_tuple_to_bytes(t) for t in tuple_list]
    return b''.join(byte_chunks)

def convert_creature_positions_to_bytes(creature_positions: CreaturePositionsDTO) -> bytes:

    id_bytes = creature_positions.creature_id.to_bytes(BYTES_FOR_CREATURE_ID, "big")
    positions_bytes = convert_tuple_list_to_bytes(creature_positions.position_data)

    return id_bytes + positions_bytes

def convert_creature_position_list_to_bytes(creature_positions_list: List[CreaturePositionsDTO]) -> bytes:

    byte_chunks = [convert_creature_positions_to_bytes(c) for c in creature_positions_list]
    return b''.join(byte_chunks)