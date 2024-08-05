import { useState } from "react";
import classNames from "classnames";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello World</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div className={classNames("message", count !== 0 ? "active" : "")}>
          {count !== 0 && "You've clicked the button! 🎉"}
        </div>
      </div>
    </>
  );
}

export default App;
