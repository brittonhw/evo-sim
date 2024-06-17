## running the backend locally (MacOS)

#### 1) set your DynamoDB path
1) after downloading [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html), you'll need to find your paths to `dynamodb_local_latest/DynamoDBLocal_lib` and `dynamodb_local_latest/DynamoDBLocal.jar` and update them in the backend `local_config.yaml`
2) make sure java is available by running `java -version`
3) that's it! python will start and stop dynamoDB automatically when you run the app.

#### 2) launch the application

1) `cd backend/`
2) add the current directory to your pythonpath
    - `export PYTHONPATH=$PYTHONPATH:.`
3) create a venv
    - `/usr/local/bin/python3.12 -m venv .venv`
    - `source .venv/bin/activate`
    - `pip install -r requirements.txt`
4) start the application
    - `python src/main/main.py`
    - explore API's at http://localhost:8300/evo-sim/docs


## running tests:
1. run steps 1-3 above
2. run `pip install -r requirements-test.txt`
3. run `pytest`

## formatting your code:
1. run steps 1-3 above, and then run `flake8 src`