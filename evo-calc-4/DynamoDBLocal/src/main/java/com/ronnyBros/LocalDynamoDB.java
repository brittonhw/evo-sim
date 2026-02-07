package com.ronnyBros;


import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.waiters.WaiterResponse;
import software.amazon.awssdk.http.urlconnection.UrlConnectionHttpClient;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeDefinition;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.CreateTableRequest;
import software.amazon.awssdk.services.dynamodb.model.CreateTableResponse;
import software.amazon.awssdk.services.dynamodb.model.DeleteItemRequest;
import software.amazon.awssdk.services.dynamodb.model.DescribeTableRequest;
import software.amazon.awssdk.services.dynamodb.model.DescribeTableResponse;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.KeySchemaElement;
import software.amazon.awssdk.services.dynamodb.model.KeyType;
import software.amazon.awssdk.services.dynamodb.model.ListTablesResponse;
import software.amazon.awssdk.services.dynamodb.model.ProvisionedThroughput;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ScalarAttributeType;
import software.amazon.awssdk.services.dynamodb.waiters.DynamoDbWaiter;
import software.amazon.dynamodb.services.local.main.ServerRunner;
import software.amazon.dynamodb.services.local.server.DynamoDBProxyServer;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class LocalDynamoDB {



    public static void createTable(DynamoDbClient ddb, String tableName, String key) {

        DynamoDbWaiter dbWaiter = ddb.waiter();
        CreateTableRequest request = CreateTableRequest.builder()
                .attributeDefinitions(AttributeDefinition.builder()
                        .attributeName(key)
                        .attributeType(ScalarAttributeType.S)
                        .build())
                .keySchema(KeySchemaElement.builder()
                        .attributeName(key)
                        .keyType(KeyType.HASH)
                        .build())
                .provisionedThroughput(ProvisionedThroughput.builder()
                        .readCapacityUnits(5L)
                        .writeCapacityUnits(5L)
                        .build())
                .tableName(tableName)
                .build();

        try {
            CreateTableResponse response = ddb.createTable(request);
            DescribeTableRequest tableRequest = DescribeTableRequest.builder()
                    .tableName(tableName)
                    .build();

            // Wait until the Amazon DynamoDB table is created
            WaiterResponse<DescribeTableResponse> waiterResponse = dbWaiter.waitUntilTableExists(tableRequest);
            waiterResponse.matched().response().ifPresent(System.out::println);

        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }


    public static void putItemInTable(DynamoDbClient ddb,
                                      String tableName,
                                      String key,
                                      String keyVal,
                                      HashMap<String, AttributeValue> itemValues
                                      ) {
        itemValues.put(key, AttributeValue.builder().s(keyVal).build());
//        itemValues.put(awards, AttributeValue.builder().s(awardVal).build());
        ddb.putItem(PutItemRequest.builder()
                .tableName(tableName)
                .item(itemValues)
                .build());
    }

    public static void getDynamoDBItem(DynamoDbClient ddb, String tableName, String key, String keyVal) {

        HashMap<String, AttributeValue> keyToGet = new HashMap<String, AttributeValue>();

        keyToGet.put(key, AttributeValue.builder()
                .s(keyVal).build());

        GetItemRequest request = GetItemRequest.builder()
                .key(keyToGet)
                .tableName(tableName)
                .consistentRead(true)
                .build();

        try {
            Map<String, AttributeValue> returnedItem = ddb.getItem(request).item();

            if (!returnedItem.isEmpty()) {
                Set<String> keys = returnedItem.keySet();
                for (String key1 : keys) {
                    System.out.format("%s: %s\n", key1, returnedItem.get(key1).s());
                }
            } else {
                System.out.format("No item found with the key: %s!\n", keyToGet.get(key).s());
            }
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public static void deleteDynamoDBItem(DynamoDbClient ddb, String tableName, String key, String keyVal) {

        HashMap<String, AttributeValue> keyToGet =
                new HashMap<String, AttributeValue>();

        keyToGet.put(key, AttributeValue.builder()
                .s(keyVal)
                .build());

        DeleteItemRequest deleteReq = DeleteItemRequest.builder()
                .tableName(tableName)
                .key(keyToGet)
                .build();

        try {
            ddb.deleteItem(deleteReq);
        } catch (DynamoDbException e) {
            System.err.println(e.getMessage());
            System.exit(1);
        }
    }

    public static void main(String[] args) {

        try {
            String port = "8900";
            String uri = "http://localhost:" + port;
            // Create an in-memory and in-process instance of DynamoDB Local that runs over HTTP
            final String[] localArgs = {"-inMemory", "-port", port};
            System.out.println("Starting DynamoDB Local...");
            DynamoDBProxyServer server = ServerRunner.createServerFromCommandLineArgs(localArgs);
            server.start();

            //  Create a client and connect to DynamoDB Local
            //  Note: This is a dummy key and secret and AWS_ACCESS_KEY_ID can contain only letters (A–Z, a–z) and numbers (0–9).
            DynamoDbClient ddbClient = DynamoDbClient.builder()
                    .endpointOverride(URI.create(uri))
                    .httpClient(UrlConnectionHttpClient.builder().build())
                    .region(Region.US_EAST_1)
                    .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create("dummyKey", "dummySecret")))
                    .build();

            String gameboardsTableName = "Gameboards";
            String keyName = "gameboard_id";
            createTable(ddbClient, gameboardsTableName, keyName);

            //  List all the tables in DynamoDB Local

            System.out.println("Listing tables in DynamoDB Local...");
            System.out.println("-------------------------------");
            ListTablesResponse listTablesResponse = ddbClient.listTables();
            System.out.println(listTablesResponse.tableNames());


            String key1 = "Gameboard1";
            String key2 = "Gameboard2";

            // Insert data into the table
            System.out.println();
            System.out.println("Inserting data into the table:" + gameboardsTableName);
            System.out.println();

            String time = java.time.Instant.now().toString();
            Map<String, AttributeValue> itemValues = Map.of("status", "started",)





            putItemInTable(ddbClient, gameboardsTableName, keyName, key1, "albumTitle", "The Colour And The Shape", "awards", "awardVal", "songTitle", "songTitleVal");
            putItemInTable(ddbClient, gameboardsTableName, keyName, key2, "albumTitle", "Let It Be", "awards", "awardVal", "songTitle", "songTitleVal");

            // Get data from the table
            System.out.println("Getting Item from the table for key: " + key1);
            System.out.println("-------------------------------");
            getDynamoDBItem(ddbClient, tableName, keyName, key1);

            System.out.println();

            System.out.println("Getting Item from the table for key: " + key2);
            System.out.println("-------------------------------");
            getDynamoDBItem(ddbClient, tableName, keyName, key2);

            System.out.println();
            System.out.println("Deleting Item with key: " + key1);
            System.out.println();

            deleteDynamoDBItem(ddbClient, tableName, keyName, key1);

            System.out.println("Getting Item for key: " + key1);
            System.out.println("-------------------------------");
            getDynamoDBItem(ddbClient, tableName, keyName, key1);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}