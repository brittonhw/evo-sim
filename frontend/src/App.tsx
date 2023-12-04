import Navbar from "./components/navbar/NavBar";
import GridView from "./components/grid_view/GridView";
import "./components/navbar/navbar.css";
import { useState } from "react";
import InfoView from "./components/info_view/InfoView";
import AnalyticsView from "./components/analytics_view/AnalyticsView";
import Header from "./components/header/Header";
import { AlertProvider } from "./contexts/AlertContext";
import RunView from "./components/run_view/RunView";
import PlaybackView from "./components/playback_view/PlaybackView";

const App = () => {
  // TODO update the menu id logic
  const [selectedMenuId, setSelectedMenuId] = useState("1a");

  const [rows, setRows] = useState(64);
  const [cols, setCols] = useState(64);
  const [gridData, setGridData] = useState(
    Array.from({ length: rows }, () => Array(cols).fill(0))
  );

  return (
    <AlertProvider>
      <div
        className="app"
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Navbar
          selectedMenuId={selectedMenuId}
          setSelectedMenuId={setSelectedMenuId}
        />
        <div style={{ display: "inline" }}>
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
      </div>
    </AlertProvider>
  );
};

export default App;
