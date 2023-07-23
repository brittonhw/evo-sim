import { useEffect, useState } from "react";

type gridData = number[][]
interface Props{
  data: gridData
}


const Grid = (props:Props) => {

  const [squareSize, setSquareSize] = useState(30); // Initial square size

  useEffect(() => {
    // Calculate the square size based on the grid dimensions and the desired size of the grid container
    const gridSize = 600;
    const numRows = props.data.length;
    const numCols = props.data[0].length;
    const newSquareSize = Math.floor(gridSize / Math.max(numRows, numCols));
    setSquareSize(newSquareSize);
  }, [props.data]);

  return (
    <div className="grid-container" style={{cursor: "crosshair"}}>
      {props.data.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((_cell: any, colIndex: number) => (
            <div
              key={colIndex}
              style={{
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: props.data[rowIndex][colIndex] == 0?  "white" : "black",
                border: "1px solid black",
                margin: "1px",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
