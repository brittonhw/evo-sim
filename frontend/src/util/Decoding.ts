export class CreatureData {
    id: number = 0;
    positions: Array<[number, number]> = [];
}

export class AnimationData {
    steps: number = 0;
    n_creatures: number = 0;
    creature_data: Array<CreatureData> = [];
}

const BYTES_FOR_STEPS: number = 2;
const BYTES_FOR_CREATURE_ID: number = 2;

function calculate_steps(data_bytes: Uint8Array): number {
    return data_bytes.slice(0, BYTES_FOR_STEPS).reduce((acc, byte) => (acc << 8) | byte, 0);
}

function divide_but_integer_result_required(dividend: number, divisor: number): [number, boolean] {
    const result = Math.floor(dividend / divisor);
    return [result, result * divisor === dividend];
}

function calculate_n_creatures(steps: number, data_bytes: Uint8Array): number {
    const [n, is_whole] = divide_but_integer_result_required(data_bytes.length - BYTES_FOR_STEPS, BYTES_FOR_CREATURE_ID + steps * 2);
    
    if (!is_whole) {
        throw new Error("Couldn't find the right creature length!");
    }

    return n;
}

function convert_bytes_to_tuple(tuple_bytes: Uint8Array): [number, number] {
    return [
        tuple_bytes[0],
        tuple_bytes.slice(1).reduce((acc, byte) => (acc << 8) | byte, 0)
    ];
}

function convert_bytes_to_tuple_list(tuple_list_bytes: Uint8Array): Array<[number, number]> {
    const tuple_list: Array<[number, number]> = [];

    for (let i = 0; i < tuple_list_bytes.length; i += 2) {
        tuple_list.push(convert_bytes_to_tuple(tuple_list_bytes.slice(i, i + 2)));
    }

    return tuple_list;
}

function convert_bytes_to_creature_positions(creature_positions_bytes: Uint8Array): CreatureData {
    const creature_data = new CreatureData();

    creature_data.id = creature_positions_bytes.slice(0, BYTES_FOR_CREATURE_ID).reduce((acc, byte) => (acc << 8) | byte, 0);
    creature_data.positions = convert_bytes_to_tuple_list(creature_positions_bytes.slice(BYTES_FOR_CREATURE_ID));

    return creature_data;
}

function convert_bytes_to_creature_positions_list(steps: number, creature_positions_list_bytes: Uint8Array): Array<CreatureData> {
    const creature_positions_bytes_len = BYTES_FOR_CREATURE_ID + steps * 2;
    const creature_data_list: Array<CreatureData> = [];

    for (let i = 0; i < creature_positions_list_bytes.length; i += creature_positions_bytes_len) {
        creature_data_list.push(convert_bytes_to_creature_positions(creature_positions_list_bytes.slice(i, i + creature_positions_bytes_len)));
    }

    return creature_data_list;
}

export function convert_bytes_to_animation_dto(data_bytes: Uint8Array): AnimationData {
    const animation_data = new AnimationData();

    animation_data.steps = calculate_steps(data_bytes);
    animation_data.n_creatures = calculate_n_creatures(animation_data.steps, data_bytes);
    animation_data.creature_data = convert_bytes_to_creature_positions_list(animation_data.steps, data_bytes.slice(BYTES_FOR_STEPS));

    return animation_data;
}