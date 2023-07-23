import { useState } from "react";

type Props = {
  promptText: string
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
      <button onClick={handleClick} style={{display:"flex", justifyContent:"space-between"}}>
        <span style={{marginLeft: "0px"}}>{props.promptText}</span>
        <input type="number" value={text} onChange={handleTextChange} style={{marginRight: "0px", width: "40px"}}/>
      </button>
    </div>
  );
};

export default EditableButton;
