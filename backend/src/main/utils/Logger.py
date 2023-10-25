# Create a logger instance
import logging

from colorlog import ColoredFormatter


logger = logging.getLogger('evo-sim')

# Set the log level (you can change this to DEBUG, INFO, WARNING, ERROR, CRITICAL)
logger.setLevel(logging.INFO)

# Create a handler to define where the logs should go
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)

# Create a formatter to define the log message format
formatter = ColoredFormatter(
    '%(log_color)s%(levelname)s:     %(asctime)s -- %(module)s.%(funcName)s:%(lineno)d -- %(message)s',
    datefmt="%Y-%m-%d %H:%M:%S",
    reset=True,
    log_colors={
        'DEBUG': 'cyan',
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'red,bg_white',
    },
)
handler.setFormatter(formatter)

# Add the handler to the logger
logger.addHandler(handler)