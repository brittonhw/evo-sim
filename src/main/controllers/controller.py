from fastapi import FastAPI
from pydantic import BaseModel

from service import gameboard_service
from game_logic.Gameboard import Gameboard

app = FastAPI(title="Evo Sim Service", description="Evo Sim backend")


class Item(BaseModel):
    name: str
    price: float


@app.get(
    "/gameboard/run/{size}",
    name="Get gameboard",
    description="Returns a gameboard with dimensions (size x size).",
    tags=["Gameboard Controller"],
)
async def run_sim(size: int) -> str:
    # TODO: add a gameboard input param
    # TODO: add an input specifying what games they'd like to be able to play

    gameboard = gameboard_service.run_gameboard()

    return str(gameboard)
