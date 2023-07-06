import "./App.css";
import Triangle from "./common/Triangle/Triangle";

function App() {

  return (
    <div>
      <Triangle
        points={[
          [300, 0],
          [600, 600],
          [0, 600],
        ]}
      />
    </div>
  );
}

export default App;
