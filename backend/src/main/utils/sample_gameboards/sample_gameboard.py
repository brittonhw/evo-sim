import json
from typing import List

from pathlib import Path

SAMPLE_GAMEBOARD_FILE = Path("src/main/resources/sample_gameboards/sample_gameboard_data.json")

def get_sample_gameboard() -> List[List[int]]:


    with open(SAMPLE_GAMEBOARD_FILE, 'r') as file:
        data = json.load(file)

    if isinstance(data, list) and all(isinstance(item, list) for item in data):
        return data
    
    else:
        raise TypeError("sample_gamebord file has incorrect data type")
