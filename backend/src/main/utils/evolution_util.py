from src.main.model.enum.enums import GameboardSize

import random


def move_random_direction(old_position: tuple[int, int], gameboard_size=GameboardSize):
    x_direction = random.choice([-1, 1])
    y_direction = random.choice([-1, 1])

    if old_position[0] + x_direction not in range(gameboard_size):
        x_direction = x_direction * -1

    if old_position[1] + y_direction not in range(gameboard_size):
        y_direction = y_direction * -1

    return old_position[0] + x_direction, old_position[1] + y_direction
