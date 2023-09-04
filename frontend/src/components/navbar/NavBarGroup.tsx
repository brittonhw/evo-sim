import { useState } from "react";
import DotsButton from "./DotsButton";
import PlusButton from "./PlusButton";

interface Props {
  menuItems: string[];
  title: string;
  displayMenuButtons: boolean;
}

const NavBarGroup = (props: Props) => {
  const showColor = "#898989";
  const hideColor = "#f7f7f5";
  const showColor2 = "#898989";
  const hideColor2 = "#f7f7f5";

  const [showDotsModal, setShowDotsModal] = useState(false);

  const handleClick = (e: string) => {
    console.log(e);
  };

  return (
    <>
      <div
        style={{
          fontWeight: "bold",
          color: "grey",
          fontSize: "14px",
          marginLeft: "20px",
          marginTop: "20px",
          marginBottom: "5px",
          display: "flex",
        }}
      >
        {props.title}
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <DotsButton
            show={props.displayMenuButtons}
            showColor={showColor}
            hideColor={hideColor}
            handleClick={handleClick}
            id={"test-group-id-" + props.title} // TODO set the id from backend
          />
          <PlusButton
            show={props.displayMenuButtons}
            showColor={showColor}
            hideColor={hideColor}
          />
        </div>
      </div>
      {props.menuItems.map((val: string, idx: number) => (
        <div className="navbar-item">
          {val}
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <DotsButton
              show={props.displayMenuButtons}
              showColor={showColor2}
              hideColor={hideColor2}
              handleClick={handleClick}
            id={"test-subgroup-id-" + val} // TODO set the id from backend
            ></DotsButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default NavBarGroup;
