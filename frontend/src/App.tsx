import "./App.css";
import List from "./components/List";
import Grid from "./components/Grid";
import EditableButton from "./components/EditableButton";

function App() {
  const controls = [
    { label: "safe zone", id: "1" },
    { label: "barrier", id: "2" },
    { label: "radioactive zone", id: "3" },
  ];



  const gridData = [
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  ];

  return (
    <>
      <div className="flex-container">
        <div className="main-grid">
          <Grid data={gridData}></Grid>
        </div>

        <div className="properties-pane">
          <div>
            <List groupTitle="drawing controls" items={controls}></List>
            <ul>
              <p><b>grid dimensions</b></p>
              <EditableButton promptText = {"rows:"} initialText={"12"}></EditableButton>
              <EditableButton promptText = {"cols:"} initialText={"15"}></EditableButton>
            </ul>

            <ul>
              <p><b>simulation properties</b></p>
              <EditableButton promptText = {"# generations"} initialText={"1000"}></EditableButton>
              <EditableButton promptText = {"population start"} initialText={"14"}></EditableButton>
            </ul>
            <br></br>

            <List groupTitle="" items={[{ label: "Run Simulation", id: "1" }]}></List>
            <List groupTitle="" items={[{ label: "Replay Simulation", id: "1" }]}></List>
            

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
