from typing import List
from src.main.model.dto.gameboard import GameboardDTO
from src.main.config.config import config
BITS_FOR_INT_SIZE = BYTES_FOR_GAMEBOARD_SIZE = config["backend"]["encoding"]["bitLengths"][
    "gameboard_integer"
]


def convert_8_ints_to_bytes(int_list_8: List[int]) -> bytes:

    binary_string = ''.join(format(i, '03b') for i in int_list_8)
    return bytes(int(binary_string[i:i+8], 2) for i in range(0, len(binary_string), 8))


def convert_gameboard_row_to_bytes(int_list: List[int]) -> bytes:

    if len(int_list) % 8 != 0:
        raise ValueError("the size of list of ints should be a multiple of 8.")

    chunk_size = 8
    byte_chunks = [convert_8_ints_to_bytes(int_list[i:i+8])
                   for i in range(0, len(int_list), chunk_size)]
    return b"".join(byte_chunks)


def convert_gameboard_to_bytes(gameboard_dto: GameboardDTO) -> bytes:
    if not 0 < gameboard_dto.size < 2 ** (8 * BYTES_FOR_GAMEBOARD_SIZE):
        raise ValueError("not enough bytes to represent the gameboard size!")

    size_bytes = gameboard_dto.size.to_bytes(BYTES_FOR_GAMEBOARD_SIZE, "big")

    byte_chunks = [
        convert_gameboard_row_to_bytes(row)
        for row in gameboard_dto.data
    ]

    joined_chunks = b"".join(byte_chunks)

    return size_bytes + joined_chunks
