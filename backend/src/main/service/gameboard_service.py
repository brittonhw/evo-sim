import json
import os


from src.main.utils.gameboard_encoding.encoder import convert_gameboard_to_bytes

from src.main.config.config import config
from src.main.model.dto.gameboard import GameboardDTO
from src.main.utils.logger import logger

LOCAL_S3_PATH = os.path.join(".tmp", "s3")


class GameboardService:
    def run_gameboard(self, size: int):
        raise NotImplementedError()

    def save_gameboard(self, gameboard_dto: GameboardDTO) -> GameboardDTO:
        if config["env"] == "local":

            if not os.path.exists(LOCAL_S3_PATH):
                os.makedirs(LOCAL_S3_PATH)

            if gameboard_dto.id is None:
                gameboard_dto.id = "abc123"

            object_name = os.path.join(LOCAL_S3_PATH, gameboard_dto.id)

            with open(object_name, "w") as f:
                json.dump(
                    {
                        "id": gameboard_dto.id,
                        "size": gameboard_dto.size,
                        "data": gameboard_dto.data,
                    },
                    f,
                )

            logger.info("saved gameboard at path %s", object_name)

    def encode_and_save_gameboard(self, gameboard_dto: GameboardDTO):
        if config["env"] == "local":

            if not os.path.exists(LOCAL_S3_PATH):
                os.makedirs(LOCAL_S3_PATH)

            if gameboard_dto.id is None:
                gameboard_dto.id = "abc123"

            object_name = os.path.join(LOCAL_S3_PATH, gameboard_dto.id)

            with open(object_name, "w") as f:

                gameboard_bytes = convert_gameboard_to_bytes(gameboard_dto)
                gameboard_str = gameboard_bytes.hex()
                logger.info("saved gameboard as a string with length %d",
                            len(gameboard_str))

                f.write(gameboard_str)
