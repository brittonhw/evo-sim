import "../index.css";
import { drawingControlText } from "../App";
import { useEffect, useRef } from "react";

type Props = {
  id: number[];
  groupTitle: string;
  handleClick: any;
  activeDrawingControl: number;
};

interface ButtonRefs {
  [key: number]: React.RefObject<HTMLButtonElement>;
}

const List = (props: Props) => {
  const buttonRefs: ButtonRefs = {};
  for (let i = 0; i < 4; i++) {
    buttonRefs[i] = useRef(null);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const buttonNumber = parseInt(event.key, 10);
    if (buttonNumber >= 1 && buttonNumber <= 4) {
      buttonRefs[buttonNumber - 1].current?.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ul>
        <p>
          <b>{props.groupTitle}</b>
        </p>
        {props.id.map((id) => (
          <div>
            <button
              ref={buttonRefs[id]}
              className={id === props.activeDrawingControl ? "selected" : ""}
              onClick={() => props.handleClick(id)}
              key={id}
            >
              {drawingControlText.get(id)}
            </button>
          </div>
        ))}
      </ul>
    </>
  );
};

export default List;
