import { AnimationData } from "../../util/Decoding";

export const draw = (
  animationData: AnimationData,
  squareSize: number,
  frameIndex: number,
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i < animationData!.n_creatures; i += 1) {
    ctx!.fillStyle = "#000000";
    const x = animationData!.creature_data[i].positions[frameIndex][0] + 1;
    const y = animationData!.creature_data[i].positions[frameIndex][1] + 1;
    ctx!.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

    if (frameIndex > 0) {
      const old_x = animationData!.creature_data[i].positions[frameIndex - 1][0] + 1;
      const old_y = animationData!.creature_data[i].positions[frameIndex - 1][1] + 1;
      ctx!.clearRect(old_x * squareSize,old_y * squareSize,squareSize,squareSize);
    }
  }
};

export const clearAndDrawBorder = (
  ctx: CanvasRenderingContext2D,
  squareSize: number
) => {
  ctx.clearRect(0, 0, (256 + 2) * squareSize, (256 + 2) * squareSize);
  ctx!.fillStyle = "#CCCCCC";
  ctx!.fillRect(0, 0, 1, (256 + 2) * squareSize);
  ctx!.fillRect(0, 0, (256 + 2) * squareSize, 1);
  ctx!.fillRect(0, (256 + 2) * squareSize, (256 + 2) * squareSize, 1);
  ctx!.fillRect((256 + 2) * squareSize, 0, 1, (256 + 2) * squareSize + 1);
};
