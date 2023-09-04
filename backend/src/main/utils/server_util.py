def print_startup_message(server_path: str, host: str, port: str) -> str:

    dashes = "".join(["-" for i in range(60)])

    if host == "0.0.0.0":
        host = "localhost"

    msg =  "\n".join([
        "\n",
        dashes,
        "RONNY BROS. LLC",
        dashes,
        "Starting 'FASTAPI-APP'",
        dashes,
        "Check out the Swagger UI at http://{0}:{1}{2}/docs".format(host, port, server_path),
        dashes,
        "\n"
        ])
    
    print(msg)