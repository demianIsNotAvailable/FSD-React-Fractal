import "./App.css";
import Triangle from "./common/Triangle/Triangle";

function App() {

  return (
    <div>
      <Triangle
        points={[
          [400, 0],
          [800, 800],
          [0, 800],
        ]}
      />
    </div>
  );
}

export default App;
