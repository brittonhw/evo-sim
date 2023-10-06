def print_startup_message(server_path: str, host: str, port: str) -> str:

    dashes = "".join(["-" for i in range(60)])

    if host == "0.0.0.0":
        host = "localhost"

    msg =  "\n".join([
        "\n",
        dashes,
        "RONNY BROS. LLC",
        dashes,
        "Starting 'evo-sim'",
        dashes,
        "Check out the Swagger UI at http://{0}:{1}{2}/docs".format(host, port, server_path),
        dashes,
        "\n"
        ])
    
    print(msg)

def start_local_s3(port: str, data_folder: str):
    import os
    import subprocess

    # Start MinIO server with dummy access and secret keys
    minio_command = [
        "minio",
        "server",
        data_folder,
        "--address",
        "localhost:" + port,
        "--access-key",
        "your-dummy-access-key",  # Use a placeholder/dummy value
        "--secret-key",
        "your-dummy-secret-key",  # Use a placeholder/dummy value
    ]

    subprocess.Popen(minio_command)