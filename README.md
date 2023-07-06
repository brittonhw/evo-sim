# evo-sim

Evolution Simulator

creating evolution simulator, project inspired by David Randall Miller: https://www.youtube.com/watch?v=N3tRFayqVtk

## requirements

- [Python 3.11](https://www.python.org/downloads/)
- [NodeJS 18](https://nodejs.org/en/download)

## running locally

#### 1) start the backend server
- ``cd /backend``
- ``/usr/local/bin/python3.11 -m venv .venv``
- ``source .venv/bin/activate``
- ``pip install -r requirements.txt``
- ``python main_application.py``

#### 2) start the frontend ui (in a new terminal)
- ``cd /frontend``
- ``npm install``
- ``npm run-script dev``
-  visit ui at localhost:[port_number]
