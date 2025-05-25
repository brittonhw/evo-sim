import Navbar from "./navbar/NavBar";
import GridView from "./grid_view/GridView";
import "./navbar/navbar.css";
import "./container.css";
import InfoView from "./info_view/InfoView";
import AnalyticsView from "./analytics_view/AnalyticsView";
import Header from "./header/Header";
import RunView from "./run_view/RunView";
import PlaybackView from "./playback_view/PlaybackView";
import { useState } from "react";

const Container = () => {
  // TODO update the menu id logic
  const [selectedMenuId, setSelectedMenuId] = useState("1a");

  const [rows, setRows] = useState(64);
  const [cols, setCols] = useState(64);
  const [gridData, setGridData] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  return (
    <> 
      <Navbar
        selectedMenuId={selectedMenuId}
        setSelectedMenuId={setSelectedMenuId}
      />
      <div className="main-col">
        <Header />
        {selectedMenuId == "1a" ? <InfoView /> : null}
        {selectedMenuId == "1b" ? (
          <GridView
            gridData={gridData}
            setGridData={setGridData}
            rows={rows}
            setRows={setRows}
            cols={cols}
            setCols={setCols}
          />
        ) : null}
        {selectedMenuId == "1c" ? <RunView /> : null}
        {selectedMenuId == "1d" ? <PlaybackView /> : null}
        {selectedMenuId == "1e" ? <AnalyticsView /> : null}
      </div>
    </>
  );
};

export default Container;
