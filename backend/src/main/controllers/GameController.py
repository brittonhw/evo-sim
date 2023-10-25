from typing import List
from src.main.service.enum.enums import GameboardSize
from src.main.utils.sample_gameboards.sample_gameboard import get_sample_gameboard
from src.main.utils.encoders.drawing_encoder import encode_gameboard_data
from src.main.service.dto.GameboardDTO import GameboardDTO
from src.main.utils.Color import Color
from src.main.utils.Item import Item
from src.main.utils.Logger import logger
import sys

from src.main.service.GameboardService import GameboardService


from fastapi import APIRouter

router = APIRouter(tags=["Gameboard Controller"])

gameboard_service = GameboardService()


@router.post(
    "/save",
    name="save a gameboard",
    description="saves a gameboard"
)
async def save_gameboard(gameboard_dto_new: GameboardDTO,
                         use_encoded: bool | None = False,
                         use_example_data: bool | None = False) -> GameboardDTO:
    logger.info("saving a gameboard!")

    gameboard_dto = GameboardDTO(size=gameboard_dto_new.size, data=gameboard_dto_new.data)

    if use_encoded:
        # TODO: decode and populate data
        # gameboard_dto.data = decode_encoded_data(dto) 
        gameboard_dto.data = [[0, 0], [0, 0]]

    if use_example_data:
        gameboard_dto.data = get_sample_gameboard()

    logger.info("gameboard dimensions: " + str(len(gameboard_dto.data)) + \
                 " rows, " + str(len(gameboard_dto.data[0])) + " cols")
    encoded_data = encode_gameboard_data(gameboard_dto.data)

    old_size = sys.getsizeof(gameboard_dto.data) + sys.getsizeof(1) * 64 * 64  # Size of an integer

    logger.warn("about to create a badass bytes array representation! space used " \
                + "going from %d to %d Kb", old_size / 1000, sys.getsizeof(encoded_data) / 1000)

    gameboard_dto.data = None
    gameboard_dto.encoded_data = encoded_data
    return gameboard_dto

@router.get(
    "/gameboard/run/{size}",
    name="Get a random gameboard",
    description="Returns a gameboard with dimensions (size x size).",
)
async def run_sim(size: int) -> str:

    gameboard = gameboard_service.run_gameboard(size)

    return str(gameboard)


@router.get(
    "/ping/{number}",
    name="ping a number",
    description="Returns the number // 2",
)
async def ping_number2(number: int) -> Item:
    item = Item()

    return item
