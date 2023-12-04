import { useEffect, useRef, useState } from "react";
import {
  AnimationData,
  convert_bytes_to_animation_dto,
} from "../../util/Decoding";
import {
  EVO_SIM_BASE_URL,
  POSITIONS_URL,
  getBlob,
} from "../../api/RestTemplate";
import { StickerType } from "../header/HeaderSticker";
import { useAlert } from "../../contexts/AlertContext";
import { draw, clearAndDrawBorder } from "./Draw";
import EditableButton from "../grid_view/EditableButton";

const PlaybackView = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationFrameIdRef = useRef<number | null>(null);
  const [totalFrames, setTotalFrames] = useState(200);
  const { showAlert } = useAlert();
  const [animationData, setAnimationData] = useState<AnimationData | null>(
    null
  );
  const [frameRate, setFrameRate] = useState(50);
  const squareSize = 3; 
  const [frameIndex, setFrameIndex] = useState(0);
  let then = Date.now();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    clearAndDrawBorder(ctx!, squareSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    const animate = () => {
      const now = Date.now();
      const deltaTime = now - then;

      if (deltaTime > 1000 / frameRate) {
        draw(animationData!, squareSize, frameIndex, ctx!);
        setFrameIndex((prevFrameIndex) => prevFrameIndex + 1);
        then = now;
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    if (isAnimating) {
      animate();
      if (frameIndex >= totalFrames - 1) {
        setIsAnimating(false);
        setFrameIndex(0);
        clearAndDrawBorder(ctx!, squareSize);
        draw(animationData!, squareSize, 0, ctx!);
      }
    } else if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current); // Stop animation if paused
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current); // Cleanup on unmount
      }
    };
  }, [isAnimating, frameIndex, frameRate]);

  const toggleAnimation = () => {
    if (animationData !== null) {
      setIsAnimating((prevState) => !prevState);
    }
    else {
      showAlert("Must click 'Fetch data' before playing animation.", StickerType.ErrorAlert, 7);
    }
  };

  const handleFrameRateChange = (event: any) => {
    const newFrameRate = parseInt(event.target.value, 10);
    setFrameRate(isNaN(newFrameRate) ? 0 : newFrameRate);
  };

  async function fetchBytes() {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");
    const url = EVO_SIM_BASE_URL + POSITIONS_URL;
    showAlert("Fetching animation data...", StickerType.Info, 2);

    try {
      const blob = await getBlob(url);
      showAlert(
        "Fetched animation data successfully",
        StickerType.SuccessAlert,
        12
      );
      const byte_array = new Uint8Array(await blob.arrayBuffer());
      const animationData: AnimationData =
        convert_bytes_to_animation_dto(byte_array);
      setAnimationData(animationData);
      setTotalFrames(animationData.steps);
      clearAndDrawBorder(ctx!, squareSize);
      draw(animationData!, squareSize, frameIndex, ctx!);
    } catch (error) {
      console.error("Error fetching animation:", error);
      showAlert("Could not fetch animation.", StickerType.ErrorAlert, 7);
    }
  }

  return (
    <>
      <div className="playback-view">
        <p>Review your simulations here.</p>
      </div>
      <div style={{ display: "flex" }}>
        <canvas ref={canvasRef} width={800} height={800} />
        <div className="properties-pane">
          <div>
            <ul>
              <p>
                <b>playback settings</b>
              </p>
              <EditableButton
                promptText="frame rate"
                handleTextChange={handleFrameRateChange}
                value={frameRate}
              />
            </ul>
            <ul>
              <p>
                <b>playback controls</b>
              </p>
              <button onClick={fetchBytes}>Fetch data</button>
              <p></p>
              <button
                onClick={toggleAnimation}
                style={{backgroundColor: "lightgreen"}}
              >
                {isAnimating ? "Pause" : "Play"}
              </button>
            </ul>
            <ul>
              <p>
                <b>info</b>
              </p>
              <p>
                frame {frameIndex} of {totalFrames}{" "}
              </p>
              {animationData && (
                <p># of creatrues is {animationData.n_creatures}</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaybackView;
