from enum import Enum, IntEnum


class EvolutionStatus(Enum):
    NOT_STARTED = "NOT_STARTED"
    IN_PROGRESS = "IN_PROGRESS"
    CANCELLED = "CANCELLED"
    COMPLETE_ERROR = "COMPLETE_ERROR"
    COMPLETE_SUCCESS = "COMPLETE_SUCCESS"


class GameboardSize(IntEnum, Enum):
    SM = 32
    MED = 64
    LG = 128
    XL = 256


class DistinctCellValues(IntEnum, Enum):
    VALUE_4 = 4,
    VALUE_8 = 8,
    VALUE_16 = 16,
    VALUE_32 = 32,
