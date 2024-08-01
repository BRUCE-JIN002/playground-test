import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../contexts/PlaygroundContext";
import styles from "./index.module.scss";
import { FileNameItem } from "./FileNameItem";
import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME
} from "../../../files";

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
    const newFileName = "Comp" + Math.random().toString().slice(2, 6) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);
    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(APP_COMPONENT_FILE_NAME);
  };

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          creating={creating && index === arr.length - 1}
          actived={selectedFileName === item}
          readonly={readonlyFilaNames.includes(item)}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          onRemove={() => {
            handleRemove(item);
          }}
        />
      ))}
      <div className={styles.add} onClick={addTab}>
        +
      </div>
    </div>
  );
}
