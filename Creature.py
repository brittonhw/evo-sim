
class Creature:

    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.name = ''

    def set_location(self, row, col):
        self.row = row
        self.col = col
    def __str__(self):
        return 'c'
    
   