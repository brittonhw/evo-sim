from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from src.main.service.auth_service import AuthService

from src.main.utils.logger import logger

router = APIRouter(tags=["Admin Controller"])

auth_service = AuthService()


@router.get("/ping",
            name="health checks",
            description="returns 200")
async def auth() -> str:
    return 'pong!'


@router.get("/auth",
            name="gets a token",
            description="gets a jwt token")
async def auth() -> JSONResponse:
    token = auth_service.generate_token()
    response = JSONResponse(content={'message': 'set jwt token in the cookie'})
    response.set_cookie('evo_token', token)
    return response

@router.get("/auth-ping",
            name="authorized ping",
            description="returns 200 if authorized")
async def auth_ping(token_payload: dict = Depends(auth_service.validate_token)) -> JSONResponse:
    created = datetime.fromtimestamp(token_payload['exp']) - timedelta(hours=12)

    diff: timedelta = datetime.now() - created

    token_payload['created minutes ago'] = diff.seconds // 60

    return JSONResponse(content=token_payload)



