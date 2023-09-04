import { useState } from "react";
import NavBarGroup from "./NavBarGroup";
import "./navbar.css";

const Navbar = () => {
  const menuitems = ["model 0", "model 1", "model 2"];

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
          menuItems={menuitems}
          displayMenuButtons={mouseInNavBar}
          title="group 1"
        />
        <NavBarGroup
          menuItems={menuitems}
          displayMenuButtons={mouseInNavBar}
          title="group 2"
        />
      </div>
    </div>
  );
};

export default Navbar;
