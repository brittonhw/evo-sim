from src.main.utils.encoders.drawing_encoder import encode_gameboard_dto
from src.main.service.dto.GameboardDTO import GameboardDTO
from src.main.utils.Color import Color
from src.main.utils.Item import Item
from src.main.utils.Logger import logger

from src.main.service.GameboardService import GameboardService


from fastapi import APIRouter

router = APIRouter(tags=["Gameboard Controller"])

gameboard_service = GameboardService()


@router.post(
    "/save",
    name="save a gameboard",
    description="saves a gameboard"
)
async def save_gameboard(gameboard_dto: GameboardDTO) -> GameboardDTO:
    logger.info("saving a gameboard!")

    logger.info("gameboard dimensions: " + str(len(gameboard_dto.data)) + " rows, " + str(len(gameboard_dto.data[0])) + " cols")

    logger.warn("about to log a badass bytes array representation!")

    x = encode_gameboard_dto(gameboard_dto)

    return gameboard_dto

@router.get(
    "/gameboard/run/{size}",
    name="Get a random gameboard",
    description="Returns a gameboard with dimensions (size x size).",
)
async def run_sim(size: int) -> str:
    # TODO: add a gameboard input param
    # TODO: add an input specifying what games they'd like to be able to play

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
