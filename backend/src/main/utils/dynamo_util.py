import boto3

dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

response = dynamodb.create_table(
    table=dynamodb.create_table(
        TableName='sample_table',
        KeySchema=[
            {
                'AttributeName': 'board_id',
                'KeyType': 'HASH'  # Partition key
            },
            {
                'AttributeName': 'time_uploaded',
                'KeyType': 'RANGE'  # Sort key
            }
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'board_id',
                'AttributeType': 'S'  # String type
            },
            {
                'AttributeName': 'time_uploaded',
                'AttributeType': 'N'  # Number type
            }
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        }
    )
)

print(response)

item = {
    'artist': {'S': 'DAVY JONES'},
    'song': {'S': 'NEYADF'},
    'id': {'S': '1432'},
    'priceUsdCents': {'S': '1234'},
    'publisher': {'S': ' fiub'}
}
print(item)
response = dynamodb.put_item(
    TableName='basicSongsTable',
    Item=item
)
print(response)
