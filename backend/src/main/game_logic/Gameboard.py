import random

from src.main.game_logic.Creature import Creature

class Gameboard:
    def __init__(self, size):
        self.board = []
        self.size = size
        for i in range(size):
            row = []
            for j in range(size):
                row.append(0)
            self.board.append(row)

    def set_value(self, row, col, value):
        self.board[row][col] = value

    def get_value(self, row, col):
        return self.board[row][col]

    def clear(self):
        for i in range(self.size):
            for j in range(self.size):
                self.board[i][j] = 0

    def set_game(self, num_creatures):
        self.clear()

        for _ in range(num_creatures):
            row = random.randint(0, self.size - 1)
            col = random.randint(0, self.size - 1)
            self.board[row][col] = Creature(row, col)

    def update_board(self):
        self.board = self.board

    def __str__(self):
        s = ""
        for i in range(self.size):
            for j in range(self.size):
                if self.board[i][j] == 0:
                    s += " "
                else:
                    s += str(self.board[i][j]) + " "
            s += "\n"
        return s
