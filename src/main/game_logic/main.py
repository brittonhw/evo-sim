import Gameboard


def main():
    size = 128
    game_board = Gameboard.Gameboard(size)
    game_board.set_game(1000)

    print(game_board)


if __name__ == "__main__":
    main()
