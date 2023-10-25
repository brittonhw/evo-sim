from enum import Enum, IntEnum


class EvolutionStatus(Enum):
    NOT_STARTED = "NOT_STARTED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETE_ERROR = "COMPLETE_ERROR"
    COMPLETE_SUCCESS = "COMPLETE_SUCCESS"


class GameboardSize(IntEnum, Enum):
    SM = 32
    MED = 64
    LG = 128
    XL = 256
