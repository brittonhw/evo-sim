import math
import random


class ActionNode:
    def __init__(self, inputs, action):
        self.action = action
        self.activation = math.tanh(sum(inputs))


    def execute(self):
        if self.activation > 0:
            if random.random() > self.activation:
                return self.action
