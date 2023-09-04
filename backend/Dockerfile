# Use the official Python base image
FROM python:3.9-slim AS stage1

# Set the working directory inside the container
WORKDIR /app
RUN mkdir dependencies

# Copy the requirements.txt file to the container
COPY requirements.txt .

COPY bash/create_venv.sh ./scripts/create_venv.sh
RUN chmod +x scripts/create_venv.sh
RUN ./scripts/create_venv.sh

FROM python:3.9-slim
COPY --from=stage1 /app/dependencies /app/dependencies

ARG LOCAL_USER=evo_sim
ARG WORKING_DIR="/home/$LOCAL_USER"
ENV WORKING_DIR=$WORKING_DIR
WORKDIR $WORKING_DIR
COPY src/main $WORKING_DIR/python_svc/src/main
COPY bash/start.sh $WORKING_DIR/python_svc/start.sh

# Expose the port the FastAPI app will run on
EXPOSE 8300

# Set the entry point to run the FastAPI app using the main.py script
RUN chmod -R +x ${WORKING_DIR}

ENV PYTHONPATH="$PYTHONPATH:."


ENTRYPOINT "$WORKING_DIR/python_svc/start.sh"
