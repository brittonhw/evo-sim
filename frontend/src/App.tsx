import "./App.css";
import List from "./components/List";
import Grid from "./components/Grid";
import EditableButton from "./components/EditableButton";
import { useState } from "react";

export const drawingControls = {
  clear: 0,
  barrier: 1,
  radioactive: 2,
  safezone: 3,
};

export const drawingControlText = new Map([
  [drawingControls.clear, "clear"],
  [drawingControls.barrier, "barrier"],
  [drawingControls.radioactive, "radioactive zone"],
  [drawingControls.safezone, "safe zone"],
]);

export const colorMap = new Map([
  [drawingControls.clear, "white"],
  [drawingControls.barrier, "black"],
  [drawingControls.radioactive, "yellow"],
  [drawingControls.safezone, "lightgreen"],
]);

function App() {
  const [rows, setRows] = useState(64);
  const [cols, setCols] = useState(64);

  const [activeDrawingControl, setActiveDrawingControl] = useState(
    drawingControls.clear
  );

  const [gridData, setGridata] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  const handleRowChange = (event: any) => {
    let valueInteger: number = parseInt(event.target.value);
    valueInteger = valueInteger > 0 ? valueInteger : 1;
    if (valueInteger < rows) {
      const updatedGrid = gridData.slice(0, valueInteger);
      setGridata(updatedGrid);
    } else {
      const rowsToAdd = valueInteger - rows;
      const newRows = new Array(rowsToAdd).fill(new Array(cols).fill(0));
      const updatedGrid = [...gridData, ...newRows];
      setGridata(updatedGrid);
    }
    setRows(valueInteger);
  };

  const handleColChange = (event: any) => {
    let valueInteger: number = parseInt(event.target.value);
    valueInteger = valueInteger > 0 ? valueInteger : 1;
    if (valueInteger < cols) {
      const updatedGrid = gridData.map((row) => row.slice(0, valueInteger));
      setGridata(updatedGrid);
    } else {
      const colsToAdd = valueInteger - cols;
      const updatedGrid = gridData.map((row) => [
        ...row,
        ...new Array(colsToAdd).fill(0),
      ]);
      setGridata(updatedGrid);
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
    setGridata(updatedGrid);
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
    setGridata(updatedGrid);
  };

  return (
    <>
      <div className="header">
        <div style={{ display: "flex" }}>
          <h2>evolution sim</h2>
          <button className="env">{process.env.NODE_ENV}</button>
        </div>
      </div>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
