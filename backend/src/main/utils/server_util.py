def print_startup_message(server_path: str, host: str, port: str, env: str) -> str:
    dashes = "".join(["-" for _ in range(60)])

    if host == "0.0.0.0":
        host = "localhost"

    msg = "\n".join(
        [
            "\n",
            dashes,
            "RONNY BROS. LLC",
            dashes,
            "Welcome to 'evo-sim' [" + env + "]",
            dashes,
            "Check out the Swagger UI at http://{0}:{1}{2}/docs".format(
                host, port, server_path
            ),
            dashes,
            "Check out the ReDoc at http://{0}:{1}{2}/redoc".format(
                host, port, server_path
            ),
            dashes,
            "\n",
        ]
    )

    print(msg)
