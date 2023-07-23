def print_startup_message(host: str, port: str) -> str:

    dashes = "".join(["-" for i in range(60)])

    msg =  "\n".join([
        "\n",
        dashes,
        "RONNY BROS. LLC",
        dashes,
        "Starting 'FASTAPI-APP'",
        dashes,
        "Check out the Swagger UI at http://{}:{}/docs".format(host, port),
        dashes,
        "\n"
        ])
    
    print(msg)