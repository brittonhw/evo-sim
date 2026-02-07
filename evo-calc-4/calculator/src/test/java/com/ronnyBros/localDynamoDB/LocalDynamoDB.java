package com.ronnyBros.localDynamoDB;

import software.amazon.dynamodb.services.local.main.ServerRunner;
import software.amazon.dynamodb.services.local.server.DynamoDBProxyServer;

public class LocalDynamoDB {
    public static void main(String[] args) throws Exception {
        String port = "8900";
        String uri = "http://localhost:" + port;
        // Create an in-memory and in-process instance of DynamoDB Local that runs over HTTP
        final String[] localArgs = {"-inMemory", "-port", port};
        System.out.println("Starting DynamoDB Local...");
        DynamoDBProxyServer server = ServerRunner.createServerFromCommandLineArgs(localArgs);
        server.start();
    }
}
