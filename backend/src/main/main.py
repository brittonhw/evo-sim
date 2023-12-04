import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.main.config.Config import config
from src.main.controllers.EvolutionController import router as evolution_controller
from src.main.controllers.GameController import router as game_controller
from src.main.controllers.CreatureController import router as creature_controller
from src.main.utils import server_util

app = FastAPI(title="Evo Sim Service", description="Evo Sim backend")
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

if __name__ == "__main__":
    host = config['backend']['server']['host']
    port = config['backend']['server']['port']

    server_util.print_startup_message(server_path, host, port)
    # server_util.start_local_s3("9300", "s3")

    uvicorn.run(app_server, host=host, port=port)
