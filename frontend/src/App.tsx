import Container from "./components/Container";

import { AlertProvider } from "./contexts/AlertContext";

const App = () => {

  return (
    <AlertProvider>
      <div
        className="app"
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Container/>
        
      </div>
    </AlertProvider>
  );
};

export default App;
