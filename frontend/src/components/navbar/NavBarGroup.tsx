import { SyntheticEvent } from "react";
import DotsButton from "./DotsButton";
import "./navbar.css"
import PlusButton from "./PlusButton";

interface MenuItem {
  name: string;
  emoji: string; // you can set an emoji right in vscode
  id: string;
}

interface Props {
  menuItems: MenuItem[];
  title: string;
  displayMenuButtons: boolean;
  selectedMenuId?: string;
  updateSelectedMenuId: (id: string) => void;
}

const NavBarGroup = (props: Props) => {
  const showColor = "#898989";
  const hideColor = "#f7f7f5";
  const selectedColor = "#EDEDED"

  // const [showDotsModal, setShowDotsModal] = useState(false); // TODO: add dots action items

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    const targetId = (e.target as HTMLDivElement).id;
    console.log("id of button clicked:", targetId);
  };

  return (
    <>
      <div className="group-title">
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
      {props.menuItems.map((item: MenuItem) => (
        <div
          className="navbar-item"
          id={item.id}
          style={{
            backgroundColor:
              props.selectedMenuId == item.id ? selectedColor : "",
          }}
          onClick={() => {
            props.updateSelectedMenuId(item.id);
          }}
        >
          {item.emoji}&nbsp;{item.name}
          <div style={{ marginLeft: "auto", display: "flex" }}>
            <DotsButton
              show={props.displayMenuButtons}
              showColor={showColor}
              hideColor={props.selectedMenuId == item.id ? selectedColor : hideColor}
              handleClick={handleClick}
              id={"test-subgroup-id-" + item.id} // TODO set the id from backend
            ></DotsButton>
          </div>
        </div>
      ))}
    </>
  );
};

export default NavBarGroup;
