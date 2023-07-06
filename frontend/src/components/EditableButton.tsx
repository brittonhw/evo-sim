import { useState } from "react";

type Props = {
  initialText: string;
};

const EditableButton = (props: Props) => {
  const [text, setText] = useState(props.initialText);

  const handleTextChange = (event: any) => {
    console.log("text edit button:");
    console.log(event);
    setText(event.target.value);
  };

  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div>
      <button onClick={handleClick}>
        Grid dimensions: {text} by {text}
        <br></br>
        <input type="number" value={text} onChange={handleTextChange} />
        <br></br>
      </button>
    </div>
  );
};

export default EditableButton;
