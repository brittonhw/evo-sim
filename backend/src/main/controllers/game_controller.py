from fastapi import APIRouter

from src.main.model.item import Item
from src.main.service.gameboard_service import GameboardService
from src.main.model.dto.gameboard import GameboardDTO
from src.main.model.enum.enums import GameboardSize
from src.main.utils.sample_gameboards.sample_gameboard import get_sample_gameboard
from src.main.utils.logger2 import logger


router = APIRouter(tags=["Gameboard Controller"])

gameboard_service = GameboardService()


@router.post("/save", name="save a gameboard", description="saves a gameboard")
async def save_gameboard(
    gameboard_dto_new: GameboardDTO, use_example_data: bool | None = False
) -> GameboardDTO:

    gameboard_dto = GameboardDTO(
        size=gameboard_dto_new.size, data=gameboard_dto_new.data
    )

    if use_example_data:
        gameboard_dto.data = get_sample_gameboard()

    gameboard_service.save_gameboard(gameboard_dto)

    gameboard_dto.data = None
    return gameboard_dto


@router.get(
    "/run/{size}",
    name="Get a sample gameboard",
    description="Returns a gameboard.",
)
async def get_a_gameboard() -> GameboardDTO:
    size: GameboardSize = GameboardSize.MED
    example_gameboard_data = get_sample_gameboard()
    gameboard_dto = GameboardDTO(size=size, data=example_gameboard_data)

    return gameboard_dto


@router.get(
    "/ping/{number}",
    name="ping a number",
    description="Returns the number // 2",
)
async def ping_number2(number: int) -> Item:

    logger.info("heres my response!!")
    item = Item()

    return item
