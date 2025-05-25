from datetime import datetime, timedelta
import hashlib
from typing import List
from fastapi import Cookie, HTTPException
import jwt
import random
from src.main.model.dto.jwt_token_claims import JWTTokenClaims

from src.main.utils.logger import logger
from src.main.config.config import config

SECRET_KEY = config["server"]["tokenGeneration"]["secret-key"]
TOKEN_GEN_ALG = config["server"]["tokenGeneration"]["algorithm"]
JWT_TOKEN_TIME_HOURS = config["server"]["tokenGeneration"]["hoursUntilExpiry"]
BOARD_COUNT = config["server"]["tokenGeneration"]["uniqueGameboardsAllowed"]


class AuthService:

    def generate_id(self) -> str:
        now = str(datetime.utcnow())
        rand = str(random.randint(0, 100))
        new_id = hashlib.sha256((now + rand).encode("utf-8")).hexdigest()[:10]
        return new_id

    def generate_token(self, board_ids: List[str], active_boards: List[str]) -> str:
        expiry_time = datetime.utcnow() + timedelta(hours=JWT_TOKEN_TIME_HOURS)
        token_claims = JWTTokenClaims(
            session_id=self.generate_id(),
            board_ids=board_ids,
            active_boards=active_boards,
            exp=expiry_time,
        )
        jwt_token = jwt.encode(token_claims.dict(), SECRET_KEY, algorithm=TOKEN_GEN_ALG)
        return jwt_token

    def generate_first_token(self):
        board_ids = [self.generate_id() for _ in range(BOARD_COUNT)]
        board_ids.append("1a")
        active_boards = [board_ids[-1]]
        return self.generate_token(board_ids, active_boards)

    def validate_token(self, evo_token: str = Cookie(...)) -> dict:
        if not evo_token:
            raise HTTPException(status_code=403, detail="Forbidden: missing token")
        try:
            payload = jwt.decode(evo_token, SECRET_KEY, algorithms=[TOKEN_GEN_ALG])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")

    def check_token_and_id(
        self, gameboard_id: str, evo_token: str = Cookie(...)
    ) -> str:

        payload: dict = self.validate_token(evo_token)
        token_claims = JWTTokenClaims(**payload)
        logger.info("token_claims:", vars(token_claims.board_ids))
        if gameboard_id not in token_claims.board_ids:
            raise HTTPException(
                status_code=401, detail="this gameboard is not in allowed list"
            )
        if gameboard_id not in token_claims.active_boards:
            logger.info("new active board! updating token")
            token_claims.active_boards.append(gameboard_id)
            return self.generate_token(
                token_claims.board_ids, token_claims.active_boards
            )
        return evo_token
