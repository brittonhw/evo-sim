from src.main.service.dto.GameboardDTO import GameboardDTO

from src.main.utils.Logger import logger


def encode_gameboard_dto(gameboard_dto: GameboardDTO) -> bytes:

    rows = len(gameboard_dto.data)
    cols = len(gameboard_dto.data[0])

    data_array = []

    for row in gameboard_dto.data:
        data_array.extend(row)

    data_array_binary_strings = [bin(i)[2:] for i in data_array]
    data_array_bits = ''.join(data_array_binary_strings)

    # add padding
    while len(data_array_bits) % 8 != 0:
        data_array_bits += '0'
    
    int_list = []
    for i in range(0, len(data_array_bits), 8):
        int_list.append(int(data_array_bits[i:i+8], 2))
    
    logger.info("new data size is a list of ints of length " + str(len(int_list)))
    # print(int_list)
    # print(bytes(int_list))
    return bytes(int_list)


