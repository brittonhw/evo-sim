import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.main.config.config2 import config
from src.main.controllers.evolution_controller import router as evolution_controller
from src.main.controllers.game_controller import router as game_controller
from src.main.controllers.creature_controller import router as creature_controller
from src.main.utils import server_util

host = config['backend']['server']['host']
port = config['backend']['server']['port']
appName = config['backend']['appName']
env = config['backend']['env']

app = FastAPI(title=appName, description="**{0} implmementation**".format(env))
app.include_router(game_controller, prefix="/gameboard")
app.include_router(evolution_controller, prefix="/evolution")
app.include_router(creature_controller, prefix="/creature")
app.add_middleware(
    CORSMiddleware,
    allow_origins=config['backend']['server']['allowedOrigins'],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app_server = FastAPI()
server_path = "/evo-sim"
app_server.mount(server_path, app)

server_util.print_startup_message(server_path, host, port, env)

if __name__ == "__main__":

    uvicorn.run(app_server, host=host, port=port)
