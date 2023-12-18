
from datetime import datetime, timedelta
import hashlib
from fastapi import Cookie, HTTPException
import jwt
import random

from src.main.utils.logger import logger
from src.main.config.config import config

SECRET_KEY = config['server']['tokenGeneration']['secret-key']
TOKEN_GEN_ALG = config['server']['tokenGeneration']['algorithm']
JWT_TOKEN_TIME_HOURS = config['server']['tokenGeneration']['hoursUntilExpiry']
BOARD_COUNT = config['server']['tokenGeneration']['uniqueGameboardsAllowed']

class AuthService():

    def generate_id(self) -> str:
        now = str(datetime.utcnow())
        rand = str(random.randint(0, 100))
        new_id = hashlib.sha256((now + rand).encode('utf-8')).hexdigest()[:10]
        logger.info("generated an id %s", new_id)
        return new_id

    def generate_token(self) -> str:
        board_ids = [self.generate_id() for _ in range(BOARD_COUNT)]
        expiry_time = datetime.utcnow() + timedelta(hours=JWT_TOKEN_TIME_HOURS)
        claims = {
            'session_id': self.generate_id(),
            'board_ids': board_ids,
            'exp': expiry_time
        }

        jwt_token = jwt.encode(claims, SECRET_KEY, algorithm=TOKEN_GEN_ALG)
        return jwt_token
    
    def validate_token(self, evo_token: str = Cookie(...)):
        try:
            payload = jwt.decode(evo_token, SECRET_KEY, algorithms=[TOKEN_GEN_ALG])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
