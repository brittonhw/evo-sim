package com.ronnyBros;

import software.amazon.dynamodb.services.local.main.ServerRunner;
import software.amazon.dynamodb.services.local.server.DynamoDBProxyServer;

public class DynamoDBRunner {

    public static void main(String[] args) throws Exception {
        String port = "8900";
        // Create an in-memory and in-process instance of DynamoDB Local that runs over HTTP
        final String[] localArgs = {"-inMemory", "-port", port};
        System.out.println("Starting DynamoDB Local...");
        DynamoDBProxyServer server = ServerRunner.createServerFromCommandLineArgs(localArgs);
        server.start();
    }
}
