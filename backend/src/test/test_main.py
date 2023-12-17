from fastapi.testclient import TestClient
from src.main.main import app_server

client = TestClient(app_server)

def test_startup_message():
    response = client.get("/evo-sim/gameboard/ping/72")
    assert response.status_code == 200
    print(response.json())
    # assert response.json() == {"message": "Your startup message"}
