import React, { useState } from "react";

import styles from "./index.module.scss";
import classnames from "classnames";

export interface FileNameItemProps {
  value: string;
  actived: boolean;
  onClick: () => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (
  props: FileNameItemProps
) => {
  const { value, actived = false, onClick } = props;
  const [name] = useState(value);

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {name}
    </div>
  );
};
