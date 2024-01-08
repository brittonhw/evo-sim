from datetime import datetime, timedelta
from fastapi import APIRouter, Cookie, Depends
from fastapi.responses import JSONResponse
from src.main.service.auth_service import AuthService

router = APIRouter(tags=["Admin Controller"])

auth_service = AuthService()


@router.get("/ping",
            name="health checks",
            description="returns 200")
async def ping(evo_token: str = Cookie(default=None)) -> str:

    if evo_token:
        print("there was an optional token detected:", evo_token)
    return 'pong!'


@router.get("/auth",
            name="authenticates a token, or returns a new one",
            description="authenticates a token, or if no token supplied, returns a new one")
async def auth(evo_token: str = Cookie(default=None)) -> JSONResponse:
    if not evo_token:
        print("there was no evo token detected")
    evo_token = auth_service.generate_first_token()
    response = JSONResponse(content={'message': 'set jwt token in the cookie'})
    response.set_cookie('evo_token', evo_token)
    return response


@router.get("/auth-ping",
            name="authorized ping",
            description="returns 200 if authorized")
async def auth_ping(token_payload: dict = Depends(auth_service.validate_token)) -> JSONResponse:
    created = datetime.fromtimestamp(token_payload['exp']) - timedelta(hours=12)

    diff: timedelta = datetime.now() - created

    token_payload['created minutes ago'] = diff.seconds // 60

    return JSONResponse(content=token_payload)
