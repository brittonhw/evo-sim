import logging

from colorlog import ColoredFormatter

logger = logging.getLogger('evo-sim')

logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)

formatter = ColoredFormatter(
    '%(log_color)s%(levelname)s:     %(asctime)s -- %(module)s.%(funcName)s:%(lineno)d -- %(message)s',
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
logger.addHandler(handler)