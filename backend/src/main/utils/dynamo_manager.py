
from src.main.config.config import config
from src.main.utils.logger import logger

import subprocess
import time
import boto3


PATH_TO_DYNAMO_LIB = config['dynamoDB']['path_to_dynamo_lib']
PATH_TO_DYNAMO_JAR = config['dynamoDB']['path_to_dynamo_jar']
DYNAMO_PORT = config['dynamoDB']['port']

START_COMMAND = 'java -Djava.library.path={0} -jar {1} -sharedDb -port {2}'\
    .format(PATH_TO_DYNAMO_LIB, PATH_TO_DYNAMO_JAR, DYNAMO_PORT)


class LocalDynamoManager():

    def __init__(self) -> None:
        self.dynamodb_local_process = None
        self.dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')


    def table_exists(self, table_name):
        try:
            self.dynamodb.Table(table_name).load()
            return True
        except Exception:
            return False

    def delete_table(self,table_name):
        if self.table_exists(table_name):
            self.dynamodb.Table(table_name).delete()
            logger.info("table %s deleted", table_name)
        else:
            logger.info("table %s does not exist", table_name)


    def start_local_dynamo(self):

        self.dynamodb_local_process = subprocess.Popen(START_COMMAND.split())

        time.sleep(2)

        table_name = 'YourTableName'

        self.delete_table(table_name)

        time.sleep(5)

        attribute_definitions = [
            {'AttributeName': 'PrimaryKey', 'AttributeType': 'S'},
        ]
        key_schema = [
            {'AttributeName': 'PrimaryKey', 'KeyType': 'HASH'},
        ]

        self.dynamodb.create_table(
            TableName=table_name,
            AttributeDefinitions=attribute_definitions,
            KeySchema=key_schema,
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,  # Adjust as needed
                'WriteCapacityUnits': 5  # Adjust as needed
            }
        )

        waiter = self.dynamodb.get_waiter('table_exists')
        waiter.wait(TableName=table_name)

        logger.info("table %s created successfully", table_name)

    def terminate_local_dynamo(self):

        self.dynamodb_local_process.terminate()
