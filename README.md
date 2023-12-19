# evo-sim

The ronny bros' **evolution simulator**  inspired by David Randall Miller: https://www.youtube.com/watch?v=N3tRFayqVtk

## requirements

- [Python 3.11](https://www.python.org/downloads/)
- [NodeJS 20](https://nodejs.org/en/download)
- [Java 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Amazon DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

## running locally (MacOS)

#### 1) set your DynamoDB path
1) set dyamoDB.enabled to true in your `local_config.yaml`
2) you'll need to find your paths to `dynamodb_local_latest/DynamoDBLocal_lib` and `dynamodb_local_latest/DynamoDBLocal.jar` and update them in `local_config.yaml`
3) make sure java is available by running `java -version`
4) that's it! python will start and stop dynamoDB automatically.

#### 2) start the backend server
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

#### 3) start the frontend ui (in a new terminal)
- `cd frontend/`
- `npm install`
- `npm run-script dev`
- visit ui at http://localhost:{port}/
