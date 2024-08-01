import { useContext } from "react";
import Editor from "./Editor";
import FileNameList from "./FileNameList";
import { PlaygroundContext } from "../../contests/PlaygroundContext";
import { debounce } from "lodash-es";

export default function CodeEditor() {
  const { files, theme, selectedFileName, setFiles } =
    useContext(PlaygroundContext);
  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      <FileNameList />
      <div style={{ height: "calc(100% - 38px)" }}>
        <Editor
          file={file}
          theme={theme}
          onChange={debounce(onEditorChange, 500)}
        />
      </div>
    </div>
  );
}
