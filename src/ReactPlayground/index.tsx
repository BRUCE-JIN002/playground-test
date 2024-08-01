import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./components/Header";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import { PlaygroundContext } from "./contests/PlaygroundContext";
import { useContext } from "react";
import classNames from "classnames";
import "./index.scss";
import AntdConfigContextProvider from "./contests/AntdConfigContext";

export default function ReactPlayground() {
  const { theme } = useContext(PlaygroundContext);
  return (
    <AntdConfigContextProvider>
      <div className={classNames(theme, "wrapper")}>
        <Header />
        <div className={classNames("contentWrapper")}>
          <Allotment defaultSizes={[100, 100]}>
            <Allotment.Pane minSize={0}>
              <CodeEditor />
            </Allotment.Pane>
            <Allotment.Pane minSize={0}>
              <Preview />
            </Allotment.Pane>
          </Allotment>
        </div>
      </div>
    </AntdConfigContextProvider>
  );
}
