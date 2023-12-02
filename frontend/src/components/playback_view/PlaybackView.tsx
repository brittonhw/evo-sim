import { useEffect, useRef, useState } from "react";
import EditableButton from "../grid_view/EditableButton";
import { GameboardSize } from "../../models/enum";



// this component is broken (TODO)
const PlaybackView = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const [frameRate, setFrameRate] = useState(10);
  const [boardSize, setBoardSize] = useState(GameboardSize.XL)
  const canvas = canvasRef.current;
  const ctx = canvas!.getContext("2d")!;

  let frameIndex = 0


  useEffect(() => {

    const squareSize = 3; // Size of each square
    let lastTime = 0;

    const draw = () => {
      
      // insert drawing here
      
      frameIndex += 1
      if (frameIndex == 200) {
        setIsAnimating(false)
        frameIndex = 0
        ctx.clearRect(0, 0, boardSize * squareSize, boardSize * squareSize)
      }
    };

    const animate = (time: number) => {
      const deltaTime = time - lastTime;

      if (deltaTime > 1000 / frameRate) {
        draw();
        lastTime = time;
      }

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      animate(0);
    } else if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current); // Stop animation if paused
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current); // Cleanup on unmount
      }
    };
  }, [isAnimating, frameRate]);

  const toggleAnimation = () => {
    setIsAnimating((prevState) => !prevState);
  };

  const handleFrameRateChange = (event: any) => {
    const newFrameRate = parseInt(event.target.value, 10);
    setFrameRate(isNaN(newFrameRate) ? 0 : newFrameRate);
  };

  return (
    <>
      <div className="analytics-view">
        <p>Analyze your simulations here.</p>
        <button onClick={toggleAnimation}>
          {isAnimating ? "pause" : "play"}
        </button>

        <EditableButton
          promptText="frame rate"
          handleTextChange={handleFrameRateChange}
          value={frameRate}
        ></EditableButton>
      </div>

      <canvas ref={canvasRef} width={800} height={800} />
    </>
  );
};

export default PlaybackView;
