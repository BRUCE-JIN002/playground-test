import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../PlaygroundContext";
import styles from "./index.module.scss";
import { FileNameItem } from "./FileNameItem";

export default function FileNameList() {
  const { files, selectedFileName, setSelectedFileName } =
    useContext(PlaygroundContext);
  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className={styles.tabs}>
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          onClick={() => setSelectedFileName(item)}
          value={item}
          actived={selectedFileName === item}
        />
      ))}
    </div>
  );
}
