import { useEffect, useRef, useState } from "react";

const AnalyticsView = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation
  const animationFrameIdRef = useRef<number | null>(null); // Ref to store the animation frame ID

  const totalFrames = 200
  

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = "06AF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 4)];
    }
    return color;
  };

  const [frameIndex, setFrameIndex] = useState(0)


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const squareSize = 3; // Size of each square

    const draw = () => {
      // iterate through creatures, clear all creature positions i-1, draw positions i

      for (let x = 0; x < 256; x++) {
        for (let y = 0; y < 256; y++) {
          ctx!.fillStyle = getRandomColor();
          ctx!.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
        }
      }
    };

    const animate = () => {
      draw();
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      setFrameIndex(frameIndex + 1);
      if (frameIndex == totalFrames) {
        setIsAnimating(false);
        setFrameIndex(1);
      }
      animate();
    } else if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current); // Stop animation if paused
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current); // Cleanup on unmount
      }
    };
  }, [isAnimating, frameIndex]);

  const toggleAnimation = () => {
    setIsAnimating((prevState) => !prevState);
  };

  return (
    <>
      <div className="analytics-view">
        <p>Analyze your simulations here.</p>
        <p>frame {frameIndex} of {totalFrames} </p>
        <button onClick={toggleAnimation}>
          {isAnimating ? "Pause" : "Play"}
        </button>
      </div>

      <canvas ref={canvasRef} width={800} height={800} />
    </>
  );
};

export default AnalyticsView;
