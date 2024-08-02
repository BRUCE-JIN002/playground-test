import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../contexts/PlaygroundContext";
import styles from "./index.module.scss";
import { FileNameItem } from "./FileNameItem";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME
} from "../../../files";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const readonlyFilaNames = [
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
  APP_COMPONENT_FILE_NAME
];

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    addFile,
    removeFile,
    updateFileName,
    setSelectedFileName
  } = useContext(PlaygroundContext);
  const [tabs, setTabs] = useState([""]);
  const [creating, setCreating] = useState(false);

  useEffect(() => setTabs(files.map((item) => item.name)), [files]);

  const handleEditComplete = (name: string, preName: string) => {
    updateFileName(preName, name);
    setSelectedFileName(name);
    setCreating(false);
  };

  const addTab = () => {
    const unTitledIndex =
      files.filter((item) => item.name.startsWith("Untitled")).length + 1;
    const newFileName = `Untitled-${unTitledIndex}`;
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(APP_COMPONENT_FILE_NAME);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.tabs}>
        {tabs.map((tab, index, arr) => (
          <FileNameItem
            index={index}
            key={tab + index}
            value={tab}
            creating={creating && index === arr.length - 1}
            actived={selectedFileName === tab}
            readonly={readonlyFilaNames.includes(tab)}
            onClick={() => setSelectedFileName(tab)}
            onEditComplete={(name: string) => handleEditComplete(name, tab)}
            onRemove={() => {
              handleRemove(tab);
            }}
          />
        ))}
        <div title="Add File" className={styles.add} onClick={addTab}>
          +
        </div>
      </div>
    </DndProvider>
  );
}
