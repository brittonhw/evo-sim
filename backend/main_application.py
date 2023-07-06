import uvicorn

from controllers.controller import app

if __name__ == "__main__":
    dashes = "".join(["-" for i in range(60)])
    host = "localhost"
    port = 8300

    print("\n" + dashes)
    print("RONNY BROS. LLC")
    print(dashes)
    print("Starting 'FASTAPI-APP'")
    print(dashes)
    print("Check out the Swagger UI at http://{}:{}/docs".format(host, port))
    print(dashes + "\n")

    uvicorn.run(app, host=host, port=port)
