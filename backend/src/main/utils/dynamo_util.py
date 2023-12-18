import boto3

dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000')

response = dynamodb.create_table(
  TableName="basicSongsTable",
  AttributeDefinitions=[
    {
      "AttributeName": "artist",
      "AttributeType": "S"
    },
    {
      "AttributeName": "song",
      "AttributeType": "S"
    }
  ],
  KeySchema=[
    {
      "AttributeName": "artist",
      "KeyType": "HASH"
    },
    {
      "AttributeName": "song",
      "KeyType": "RANGE"
    }
  ],
  ProvisionedThroughput={
    "ReadCapacityUnits": 1,
    "WriteCapacityUnits": 1
  }
)

print(response)

item = {
        'artist':{'S':'DAVY JONES'},
        'song':{'S':'NEYADF'},
        'id':{'S': '1432'},
        'priceUsdCents':{'S': '1234'},
        'publisher':{'S': ' fiub'}
}
print(item)
response = dynamodb.put_item(
    TableName='basicSongsTable', 
    Item=item
)
print(response)