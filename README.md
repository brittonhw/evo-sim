# evo-sim

The ronny bros' **evolution simulator**  inspired by David Randall Miller: https://www.youtube.com/watch?v=N3tRFayqVtk

## requirements

- [Python 3.11](https://www.python.org/downloads/)
- [NodeJS 20](https://nodejs.org/en/download)
- [Java 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Amazon DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

## running locally (MacOS)

#### 1) set up DynamoDB local
-  after downloading Amazon-provided local implementation of [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html), you'll need to update `local_config.yaml' to point to your dynamoDB installation files:
    - `dynamodb_local_latest/DynamoDBLocal_lib`
      `dynamodb_local_latest/DynamoDBLocal.jar`

- make sure java is available by running `java -version`


#### 2) start the backend server

- refer to `/backend/README.md`

#### 3) start the frontend server

- refer to `/frontend/README.md`

## before pushing
1) run `flake8 src`
2) run `pytest`
