from src.main.game_logic.action_node import ActionNode


class Brain:
    def __init__(self, genome):
        self.genome = genome
        self.move_node = ActionNode([1, 2, 3], "move")

    def wire_brain(self):
        # TODO: implement
        pass
