import "./App.css";
import List from "./components/List";
import Grid from "./components/Grid";
import EditableButton from "./components/EditableButton";

function App() {
  const controls = [
    { label: "safe zone", id: "1" },
    { label: "barrier", id: "2" },
    { label: "radioactive zone", id: "3" },
    { label: "delete", id: "4" },
  ];

  return (
    <>
      <div className="flex-container">
        <div>
          <Grid></Grid>
        </div>
        <div>
          <div>
            <List groupTitle="drawing controls" items={controls}></List>
            <ul>
              <p><b>grid controls</b></p>

              <EditableButton initialText={"12"}></EditableButton>
              <EditableButton initialText={"15"}></EditableButton>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
