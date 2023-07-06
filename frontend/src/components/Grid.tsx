const Grid = () => {
  // Generate the 50x50 grid filled with 1's
  const grid = Array(64).fill(Array(64).fill(1));

  return (
    <div className="grid-container" style={{cursor: "crosshair"}}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: "flex" }}>
          {row.map((_cell: any, cellIndex: number) => (
            <div
              key={cellIndex}
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "white",
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
