import { useEffect, useState } from "react";
import { colorMap } from "./GridView";

type gridData = number[][];
interface Props {
  data: gridData;
  handleCellClick: any;
  handleMouseDownDraw: any;
  handleMouseUpDraw: any;
}

const Grid = (props: Props) => {
  const [squareSize, setSquareSize] = useState(30);

  useEffect(() => {
    const gridSize = 600;
    const numRows = props.data.length;
    const numCols = props.data[0].length;
    const newSquareSize = Math.floor(gridSize / Math.max(numRows, numCols));
    setSquareSize(newSquareSize);
  }, [props.data]);

  return (
    <div className="grid-container" style={{ cursor: "crosshair" }}>
      {props.data.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((_cell: any, colIndex: number) => (
            <div
              key={colIndex}
              onClick={() => props.handleCellClick(rowIndex, colIndex)}
              onMouseDown={() => props.handleMouseDownDraw(rowIndex, colIndex)}
              onMouseUp={() => props.handleMouseUpDraw(rowIndex, colIndex)}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: colorMap.get(props.data[rowIndex][colIndex]),
                border: ".5px solid black",
                margin: ".5px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
