package com.ronnyBros;


import com.ronnyBros.localDynamoDB.LocalDynamoDB;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;


class AppTest {

    @BeforeAll
    public static void setup() throws Exception {
        String[] args = {};
        LocalDynamoDB.main(args);
    }

    @Test
    void testMain() {
        String[] args = {"some", "arg"};
        App.main(args);
    }
}
