import ReactPlayground from "./ReactPlayground/index";
import "./App.scss";
import { PlaygroundProvider } from "./ReactPlayground/contexts/PlaygroundContext";
import ErrorBoundary from "./ReactPlayground/components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <PlaygroundProvider>
        <ReactPlayground />
      </PlaygroundProvider>
    </ErrorBoundary>
  );
}

export default App;
