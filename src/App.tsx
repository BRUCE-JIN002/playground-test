import ReactPlayground from "./ReactPlayground/index";
import "./App.scss";
import { PlaygroundProvider } from "./ReactPlayground/contests/PlaygroundContext";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return (
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <h1>Something went wrong</h1>
            <p>{error.message}</p>
          </div>
        );
      }}
    >
      <PlaygroundProvider>
        <ReactPlayground />
      </PlaygroundProvider>
    </ErrorBoundary>
  );
}

export default App;
