from typing import List
from src.main.config.config import config
from src.main.utils.logger import logger

from datetime import datetime
import subprocess
import time
import boto3


PATH_TO_DYNAMO_LIB = config["dynamoDB"]["path_to_dynamo_lib"]
PATH_TO_DYNAMO_JAR = config["dynamoDB"]["path_to_dynamo_jar"]
DYNAMO_PORT = config["dynamoDB"]["port"]
TABLE_NAME = config["dynamoDB"]["table_name"]


START_COMMAND = "java -Djava.library.path={0} -jar {1} -sharedDb -port {2}".format(
    PATH_TO_DYNAMO_LIB, PATH_TO_DYNAMO_JAR, DYNAMO_PORT
)


class LocalDynamoManager:

    def __init__(self) -> None:
        self.dynamodb_local_process = None
        self.dynamodb = None
        self.running = False

    def clean_all_tables(self):
        all_tables: List[str] = self.dynamodb.list_tables()["TableNames"]
        for table_name in all_tables:
            self.dynamodb.delete_table(TableName=table_name)
        logger.info("deleted %d tables - environment is now clean!", len(all_tables))

    def start_local_dynamo(self):
        self.dynamodb_local_process = subprocess.Popen(START_COMMAND.split())
        self.running = True
        self.dynamodb = boto3.client("dynamodb", endpoint_url="http://localhost:8000")
        time.sleep(2)
        self.clean_all_tables()

        key_schema = [{"AttributeName": "board_id", "KeyType": "HASH"}]

        attribute_definitions = [{"AttributeName": "board_id", "AttributeType": "S"}]

        provisioned_throughput = {"ReadCapacityUnits": 2, "WriteCapacityUnits": 2}

        self.dynamodb.create_table(
            TableName=TABLE_NAME,
            KeySchema=key_schema,
            AttributeDefinitions=attribute_definitions,
            ProvisionedThroughput=provisioned_throughput,
        )

        waiter = self.dynamodb.get_waiter("table_exists")
        waiter.wait(TableName=TABLE_NAME)

        logger.info("table '%s' created successfully", TABLE_NAME)

    def put_gameboard_data(self, gameboard_id: str, board_data: str) -> dict:

        logger.info("saving gameboard id %s", gameboard_id)

        new_item = {
            "board_id": {
                "S": gameboard_id,
            },
            "last_modified": {"N": str(int(datetime.utcnow().timestamp()))},
            "board_data": {"S": board_data},
        }

        response: dict = self.dynamodb.put_item(
            TableName=TABLE_NAME, ReturnConsumedCapacity="TOTAL", Item=new_item
        )
        return response

    def get_gameboard_data(self, gameboard_id) -> dict:

        response = self.dynamodb.get_item(
            TableName=TABLE_NAME, Key={"board_id": {"S": gameboard_id}}
        )

        return response

    def terminate_local_dynamo(self):
        self.running = False
        if self.dynamodb_local_process is not None:
            self.dynamodb_local_process.terminate()


localDynamoManager = LocalDynamoManager()
