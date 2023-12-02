import json
import os

from src.main.config.Config import config
from src.main.game_logic.Gameboard import Gameboard
from src.main.model.dto.GameboardDTO import GameboardDTO
from src.main.utils.Logger import logger

LOCAL_S3_PATH = os.path.join('.tmp', 's3')


class GameboardService:

    def run_gameboard(self, size: int) -> Gameboard:
        game_board = Gameboard(size)
        game_board.set_game(1000)

        return game_board

    def save_gameboard(self, gameboard_dto: GameboardDTO) -> GameboardDTO:

        if config['backend']['env'] == 'local':

            logger.info("saving gameboard data (local implementation)")

            if not os.path.exists(LOCAL_S3_PATH):
                os.makedirs(LOCAL_S3_PATH)

            if gameboard_dto.id is None:
                gameboard_dto.id = 'abc123'

            object_name = os.path.join(LOCAL_S3_PATH, gameboard_dto.id)

            with open(object_name, 'w') as f:
                json.dump({'id': gameboard_dto.id, 'size': gameboard_dto.size, 'data': gameboard_dto.data}, f)


