export interface Creature  {
    id: string
    genome?: string // maybe we can expand this data to look at brain wiring
    color: string // hex color for displaying in population animation
    lifeLength?: number
    positionData: number[][][] // frame i, position x, position y
}