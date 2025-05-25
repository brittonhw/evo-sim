from fastapi import APIRouter, Cookie
from fastapi.responses import JSONResponse

from src.main.service.auth_service import AuthService
from src.main.service.gameboard_service import GameboardService
from src.main.model.dto.gameboard import GameboardDTO
from src.main.utils.sample_gameboards.sample_gameboard import get_sample_gameboard


router = APIRouter(tags=["Gameboard Controller"])

gameboard_service = GameboardService()
auth_service = AuthService()


@router.post(
    "/save/{board_id}", name="save a gameboard", description="saves a gameboard"
)
async def save_gameboard(
    board_id: str,
    gameboard_dto_new: GameboardDTO,
    use_example_data: bool | None = True,
    evo_token: str = Cookie(default=None),
) -> JSONResponse:

    gameboard_dto = GameboardDTO(
        id=board_id, size=gameboard_dto_new.size, data=gameboard_dto_new.data
    )

    if use_example_data:
        gameboard_dto.data = get_sample_gameboard()

    new_token = auth_service.check_token_and_id(gameboard_dto.id, evo_token)
    save_response = gameboard_service.encode_and_save_gameboard(gameboard_dto)

    response = JSONResponse(content=save_response, status_code=200)
    response.set_cookie("evo_token", new_token)

    return response


@router.get(
    "/get/{gameboard_id}",
    name="read gamebaord from table",
    description="reads board from table",
)
async def read_gameboard(gameboard_id: str) -> JSONResponse:
    return JSONResponse(content=gameboard_service.read_gameboard(gameboard_id))
