package com.ronnyBros;

import com.ronnyBros.dynamoDb.GameboardTableData;
import org.apache.commons.cli.ParseException;
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
import software.amazon.awssdk.services.dynamodb.model.ScalarAttributeType;
import software.amazon.awssdk.services.dynamodb.waiters.DynamoDbWaiter;
import software.amazon.dynamodb.services.local.main.ServerRunner;
import software.amazon.dynamodb.services.local.server.DynamoDBProxyServer;

import static com.ronnyBros.Constant.GAMEBOARD_TABLE;
import static com.ronnyBros.Constant.GT_KEY;
import static com.ronnyBros.dynamoDb.DynamoDBManager.getItemFromGameboardTable;
import static com.ronnyBros.dynamoDb.DynamoDBManager.putItemInGameboardTable;
import static java.util.UUID.randomUUID;

import java.net.URI;
import java.time.Instant;
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

    public static void main(String[] args) throws Exception {
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

            createTable(ddbClient, GAMEBOARD_TABLE, GT_KEY);

            //  List all the tables in DynamoDB Local

            System.out.println("Listing tables in DynamoDB Local...");
            System.out.println("-------------------------------");
            ListTablesResponse listTablesResponse = ddbClient.listTables();
            System.out.println(listTablesResponse.tableNames());

            // Insert data into the table
            System.out.println();
            System.out.println("Inserting data into the table:" + GAMEBOARD_TABLE);
            System.out.println();

            String id1 = randomUUID().toString();

            putItemInGameboardTable(ddbClient, GameboardTableData.builder()
                    .id(id1)
                    .updateCount(0)
                    .time(Instant.now())
                    .status("new")
                    .build());

            putItemInGameboardTable(ddbClient, GameboardTableData.builder()
                    .id(randomUUID().toString())
                    .updateCount(0)
                    .time(Instant.now())
                    .status("in progress")
                    .build());

        System.out.println("Getting data ");
        GameboardTableData item = getItemFromGameboardTable(ddbClient, id1);
        System.out.println(item.toString());
    }

}