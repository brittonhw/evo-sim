from game_logic.Gameboard import Gameboard


def run_gameboard() -> Gameboard:
    size = 128
    game_board = Gameboard(size)
    game_board.set_game(1000)

    print(game_board)

    return game_board
