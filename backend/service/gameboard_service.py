from game_logic.Gameboard import Gameboard


def run_gameboard(size) -> Gameboard:
    game_board = Gameboard(size)
    game_board.set_game(1000)

    print(game_board)

    return game_board
