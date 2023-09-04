from src.main.game_logic.Gameboard import Gameboard

class GameboardService:

    def run_gameboard(self, size: int) -> Gameboard:
        game_board = Gameboard(size)
        game_board.set_game(1000)

        print(game_board)

        return game_board
