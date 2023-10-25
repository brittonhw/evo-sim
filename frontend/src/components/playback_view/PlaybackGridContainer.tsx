import { useState, useEffect, useMemo } from "react";
import EditableButton from "../grid_view/EditableButton";
import { ColorMap } from "../../util/Color";
import PlaybackGrid from "./PlaybackGrid";
const gridSize = 64;
const totalFrames = 100;

const generateRandomGrid = () => {
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      // Generate a random color (for demonstration purposes)
      const randomColor = `rgb(${Math.random() * 255}, ${
        Math.random() * 255
      }, ${Math.random() * 255})`;
      row.push(randomColor);
    }
    grid.push(row);
  }
  return grid;
};

const PlaybackGridContainer = () => {
  const [targetFrameRate, setTargetFrameRate] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [framesPlayed, setFramesPlayed] = useState(0);
  const [gridData, setGridData] = useState(generateRandomGrid());

  useEffect(() => {
    let animationFrameId: number | undefined;
    let lastFrameTime: number | undefined;
    const targetFrameInterval = 1000 / targetFrameRate; // Calculate the target frame interval

    const playAnimation = (timestamp: number) => {
      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= targetFrameInterval) {
        setFramesPlayed((prevFrames) => prevFrames + 1);

        if (framesPlayed >= totalFrames) {
          // Animation finished, stop playing
          setIsPlaying(false);
          return;
        }

        // Update the grid data with new colors (for demonstration purposes)
        setGridData(generateRandomGrid());

        lastFrameTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(playAnimation);
    };

    if (isPlaying && framesPlayed < totalFrames) {
      animationFrameId = requestAnimationFrame(playAnimation);
    } else {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    }

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPlaying, framesPlayed, targetFrameRate]);

  const togglePlay = () => {
    if (framesPlayed >= totalFrames) {
      // Reset frames played count when "Play" is clicked after animation completion
      setFramesPlayed(0);
      setGridData(generateRandomGrid()); // Reset grid data
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleFrameRateChange = (event: any) => {
    let valueInteger: number = parseInt(event.target.value);
    valueInteger = valueInteger > 0 ? valueInteger : 1;
    setTargetFrameRate(valueInteger);
  };

  return (
    <>
      <PlaybackGrid gridData={gridData}/>
      
      <div className="properties-pane">
        <div>
          <ul>
            <p>
              <b>animation controls</b>
            </p>
            <EditableButton
              promptText={"frame rate:"}
              value={targetFrameRate}
              handleTextChange={handleFrameRateChange}
            />
          </ul>
          <ul>
            <p>
              frame {framesPlayed}/{totalFrames}
            </p>
          </ul>
          <ul><p>rows: {gridData[0].length},  cols: {gridData.length}</p></ul>
          <ul>
            <button
              style={{ display: "flex", backgroundColor: ColorMap.GREEN }}
              onClick={togglePlay}
            >
              {isPlaying ? "pause" : "play"}
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlaybackGridContainer;
