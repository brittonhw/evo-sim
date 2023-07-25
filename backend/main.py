from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import yaml

from controllers.GameController import router as game_router
from controllers.StreamingController import router as streaming_router

from utils import server_util

with open('config/local_config.yaml', 'r') as file:
    config = yaml.safe_load(file)

app = FastAPI(title="Evo Sim Service", description="Evo Sim backend")
app.include_router(game_router)
app.include_router(streaming_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config['backend']['server']['allowedOrigins'],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)




if __name__ == "__main__":

    host = config['backend']['server']['host']
    port = config['backend']['server']['port']

    server_util.print_startup_message(host, port)

    uvicorn.run(app, host=host, port=port)

