import { useState } from "react";
import NavBarGroup from "./NavBarGroup";
import "./navbar.css";

interface Props {
  selectedMenuId: string;
  setSelectedMenuId: (id: string) => void;
}

const Navbar = (props: Props) => {

  const menuItems = [
    {"name": "Info", emoji:"📚", "id": "1a"},
    {"name": "Edit", emoji:"🖌️","id": "1b"},
    {"name": "Simulations +", emoji:"🧬", "id": "1c"},
    {"name": "Playback", emoji:"🎥", "id": "1d"},
  ]


  const [mouseInNavBar, setMouseInNavBar] = useState(false);

  const handleMouseEnter = () => {
    setMouseInNavBar(true);
  };

  const handleMouseLeave = () => {
    setMouseInNavBar(false);
  };

  return (
    <div
      className="navbar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="nav-panel">
        <div>
          <h5>
            <i style={{ paddingLeft: "30px" }}>@username</i>
          </h5>
        </div>

        <NavBarGroup
          menuItems={menuItems}
          displayMenuButtons={mouseInNavBar}
          title="group 1"
          selectedMenuId={props.selectedMenuId}
          updateSelectedMenuId={props.setSelectedMenuId}
        />
        <NavBarGroup
          menuItems={menuItems}
          displayMenuButtons={mouseInNavBar}
          title="group 2"
          updateSelectedMenuId={props.setSelectedMenuId}
        />
      </div>
    </div>
  );
};

export default Navbar;
