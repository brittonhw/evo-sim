import Navbar from "./components/navbar/NavBar";
import GridView from "./components/grid_view/GridView";
import "./components/navbar/navbar.css"


const App = () => {
  return (
    <>
      <div
        className="app"
        style={{
          display: "flex",
          height:"100vh"
        }}
      >
        <Navbar/>
        <div style={{ display: "inline" }}>
          <GridView />
        </div>
      </div>
    </>
  );
};

export default App;
