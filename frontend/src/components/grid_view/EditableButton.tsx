
type Props = {
  promptText: string;
  value: number;
  handleTextChange?: any;
  handleKeyDown?: any;
  handleClick?: any;
};

const EditableButton = (props: Props) => {
  return (
    <div>
      <button style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ marginLeft: "0px" }}>
          {props.promptText}
        </span>
        <input
          type="number"
          value={props.value}
          onChange={props.handleTextChange}
          onKeyDown={props.handleKeyDown}
          style={{ marginRight: "0px", width: "40px" }}
        />
      </button>
    </div>
  );
};

export default EditableButton;
