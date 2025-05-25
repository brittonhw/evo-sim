# evo-sim

The ronny bros' **evolution simulator** is inspired by David Randall Miller: https://www.youtube.com/watch?v=N3tRFayqVtk

## requirements

- [Python 3.12](https://www.python.org/downloads/)
- [NodeJS 20](https://nodejs.org/en/download)
- [Java 17](https://www.oracle.com/java/technologies/downloads/#java17)
- [Amazon DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

## running locally (MacOS)

#### 1) start the backend server
- refer to `/backend/README.md`

#### 2) start the frontend server
- refer to `/frontend/README.md`

## before pushing
- ensure all test cases are passing and code is linted, as in `/backend/README.md`

## contributing to project
1) create an issue in the 'issues' tab of the project's github, and create a branch that links to the issue
2) after implementing your change, test your code 
    - `cd backend/`
    - `flake8 src`
    - `pytest`
3) if you took additional steps to set up your project locally not listed in README.md, please update it!
