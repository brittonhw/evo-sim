import { GameboardSize } from "./enum";

export interface GameboardDTO {
    id: string;
    data: number[][];
    size: GameboardSize;
    encoded_data: number[];
  }
  