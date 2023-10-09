import List from "./List";
import Grid from "./Grid";
import EditableButton from "./EditableButton";
import "./grid.css";
import { useState } from "react";
import { useAlert } from "../../contexts/AlertContext";
import { StickerType } from "../header/HeaderSticker";
import { postData } from "../../api/RestTemplate";
import { ColorMap } from "../../util/Color";



export const drawingControls = {
  clear: 0,
  barrier: 1,
  radioactive: 2,
  safezone: 3,
  creature: 4,
};

export const drawingControlText = new Map([
  [drawingControls.clear, "1️⃣ clear"],
  [drawingControls.barrier, "2️⃣ barrier"],
  [drawingControls.radioactive, "3️⃣ radioactive zone"],
  [drawingControls.safezone, "4️⃣ safe zone"],
]);

export const colorMap = new Map([
  [drawingControls.clear, ColorMap.WHITE],
  [drawingControls.barrier, ColorMap.BLACK],
  [drawingControls.radioactive, ColorMap.LIGHTYELLOW],
  [drawingControls.safezone, ColorMap.GREEN],
  [drawingControls.creature, ColorMap.BLUE],
]);

export interface GameboardDTO {
  id: string
  data: number[][];
}

interface Props {
  gridData: number[][];
  setGridData: React.Dispatch<React.SetStateAction<any[][]>>;
  rows: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  cols: number;
  setCols: React.Dispatch<React.SetStateAction<number>>;
}

const GridView = ({
  gridData,
  setGridData,
  rows,
  setRows,
  cols,
  setCols,
}: Props) => {
  const [activeDrawingControl, setActiveDrawingControl] = useState(
    drawingControls.clear
  );

  const handleRowChange = (event: any) => {
    let valueInteger: number = parseInt(event.target.value);
    valueInteger = valueInteger > 0 ? valueInteger : 1;
    if (valueInteger < rows) {
      const updatedGrid = gridData.slice(0, valueInteger);
      setGridData(updatedGrid);
    } else {
      const rowsToAdd = valueInteger - rows;
      const newRows = new Array(rowsToAdd).fill(new Array(cols).fill(0));
      const updatedGrid = [...gridData, ...newRows];
      setGridData(updatedGrid);
    }
    setRows(valueInteger);
  };

  const handleColChange = (event: any) => {
    let valueInteger: number = parseInt(event.target.value);
    valueInteger = valueInteger > 0 ? valueInteger : 1;
    if (valueInteger < cols) {
      const updatedGrid = gridData.map((row) => row.slice(0, valueInteger));
      setGridData(updatedGrid);
    } else {
      const colsToAdd = valueInteger - cols;
      const updatedGrid = gridData.map((row) => [
        ...row,
        ...new Array(colsToAdd).fill(0),
      ]);
      setGridData(updatedGrid);
    }
    setCols(valueInteger);
  };

  const handleDrawingControlChange = (control: number) => {
    setActiveDrawingControl((prevControl) =>
      prevControl === control ? drawingControls.clear : control
    );
  };

  const handleCellClick = (rowIdx: number, colIdx: number) => {
    const updatedGrid = gridData.map((row) => [...row]);
    updatedGrid[rowIdx][colIdx] = activeDrawingControl;
    setGridData(updatedGrid);
  };

  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setEndX(e.clientX);
    setEndY(e.clientY);
  };

  const handleMouseMove = (e: any) => {
    if (isDrawing) {
      setEndX(e.clientX);
      setEndY(e.clientY);
    }
  };

  const [drawStart, setDrawStart] = useState([0, 0]);

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseDownDraw = (rowIdx: number, colIdx: number) => {
    console.log("mousedown: " + rowIdx.toString() + " " + colIdx.toString());
    setDrawStart([rowIdx, colIdx]);
  };

  const handleMouseUpDraw = (rowIdx: number, colIdx: number) => {
    console.log("mouseup: " + rowIdx.toString() + " " + colIdx.toString());

    const minRow = Math.min(drawStart[0], rowIdx);
    const maxRow = Math.max(drawStart[0], rowIdx);
    const minCol = Math.min(drawStart[1], colIdx);
    const maxCol = Math.max(drawStart[1], colIdx);

    const updatedGrid = gridData.map((row) => [...row]);
    for (let i = minRow; i <= maxRow; i++) {
      for (let j = minCol; j <= maxCol; j++) {
        updatedGrid[i][j] = activeDrawingControl;
      }
    }
    setGridData(updatedGrid);
  };

  const [startCreatures, setStartCreatures] = useState(100);

  const handleCreaturesChange = (event: any) => {
    let n: number = parseInt(event.target.value);
    setStartCreatures(n);
  };

  const [generations, setGenerations] = useState(1000);

  const handleGenerationsChange = (event: any) => {
    let n: number = parseInt(event.target.value);
    setGenerations(n);
  };

  const handleCreatureSpawn = () => {
    const updatedGrid = gridData.map((row) => [...row]);
    const rows = gridData.length;
    const cols = gridData[0].length;
    const prob = 0.25;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          gridData[i][j] === drawingControls.clear ||
          gridData[i][j] === drawingControls.creature
        ) {
          const spawnCreature = Math.random() < prob;
          updatedGrid[i][j] = spawnCreature
            ? drawingControls.creature
            : drawingControls.clear;
        }
      }
    }
    setGridData(updatedGrid);
  };

  const handleReset = () => {
    const updatedGrid = gridData.map((row) => [...row]);
    const rows = gridData.length;
    const cols = gridData[0].length;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        updatedGrid[i][j] = drawingControls.clear;
      }
    }
    setGridData(updatedGrid);
  };

  const { showAlert } = useAlert();

  async function handleSave() {
    showAlert("Saving board data...", StickerType.Info);
    // TODO add gameboard id logic
    const gameboardDTO: GameboardDTO = {id: '1a', data: gridData}
    const saveUrl = "http://localhost:8300/evo-sim/gameboard/save"
    await postData(saveUrl, gameboardDTO)
    .then((x) => {
      console.log("response: " + x)
      showAlert("Saved board data.", StickerType.SuccessAlert);
    })
    .catch((error) => {
      console.log("response: " + error)
      showAlert("could not save data.", StickerType.ErrorAlert);
    }
    )
    
  };

  return (
    <div>
      <div className="flex-container">
        <div
          className="main-grid"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Grid
            data={gridData}
            handleCellClick={handleCellClick}
            handleMouseDownDraw={handleMouseDownDraw}
            handleMouseUpDraw={handleMouseUpDraw}
          />
          {isDrawing && (
            <div
              style={{
                position: "fixed",
                left: Math.min(startX, endX),
                top: Math.min(startY, endY),
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY),
                border: "2px dashed blue",
                zIndex: 999,
                pointerEvents: "none",
              }}
            />
          )}
        </div>
        <div className="properties-pane">
          <div>
            <List
              groupTitle="drawing controls"
              handleClick={handleDrawingControlChange}
              activeDrawingControl={activeDrawingControl}
              id={Array.from({ length: 4 }, (_, index) => index)}
            />
            <ul>
              <p>
                <b>grid dimensions</b>
              </p>
              <EditableButton
                promptText={"rows:"}
                value={rows}
                handleTextChange={handleRowChange}
              />
              <EditableButton
                promptText={"cols:"}
                value={cols}
                handleTextChange={handleColChange}
              />
            </ul>
            <ul>
              <p>
                <b>lifecycle controls</b>
              </p>
              <EditableButton
                promptText={"# creatures at start:"}
                value={startCreatures}
                handleTextChange={handleCreaturesChange}
              />
              <EditableButton
                promptText={"# of generations:"}
                value={generations}
                handleTextChange={handleGenerationsChange}
              />
              <button
                style={{ display: "flex" }}
                onClick={() => handleCreatureSpawn()}
              >
                spawn creatures randomly
              </button>
            </ul>
            <ul>
              <br></br>
              <button
                style={{ display: "flex", backgroundColor: ColorMap.GREEN }}
                onClick={() => handleSave()}
              >
                save
              </button>
              <button
                style={{ display: "flex", backgroundColor: ColorMap.PINK }}
                onClick={() => handleReset()}
              >
                reset
              </button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridView;
