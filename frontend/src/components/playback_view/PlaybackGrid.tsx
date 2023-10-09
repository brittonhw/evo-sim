
interface Props {
    gridData: string[][]
}

const PlaybackGrid = (props: Props) => {
  return (
    <div className="grid-container">
      {props.gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row" style={{ display: "flex" }}>
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="grid-cell"
              style={{ backgroundColor: color, height: "6px", width: "6px" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlaybackGrid;
