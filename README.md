# evo-sim

Evolution Simulator

creating evolution simulator, project inspired by David Randall Miller: https://www.youtube.com/watch?v=N3tRFayqVtk

## requirements

- [Python 3.11](https://www.python.org/downloads/)
- [NodeJS 20](https://nodejs.org/en/download)

## running locally (MacOS)

#### 1) start the backend server
1) `cd backend/`
2) add the current directory to your pythonpath
    - `export PYTHONPATH=$PYTHONPATH:.`
3) create a venv
    - `/usr/local/bin/python3.11 -m venv .venv`
    - `source .venv/bin/activate`
    - `pip install -r requirements.txt`
4) start the application
    - `python src/main/main.py`
    - explore API's at http://localhost:8300/evo-sim/docs

#### 2) start the frontend ui (in a new terminal)
- `cd frontend/`
- `npm install`
- `npm run-script dev`
- visit ui at http://localhost:{port}/
