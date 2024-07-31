import React, { useEffect, useRef, useState } from "react";

import classnames from "classnames";
import styles from "./index.module.scss";
import { Popconfirm } from "antd";
export interface FileNameItemProps {
  value: string;
  actived: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onRemove: () => void;
  onEditComplete: (name: string) => void;
}

export const FileNameItem: React.FC<FileNameItemProps> = (
  props: FileNameItemProps
) => {
  const {
    value,
    actived = false,
    creating,
    readonly,
    onClick,
    onRemove,
    onEditComplete
  } = props;
  const [name, setName] = useState(value);
  const [editing, setEditing] = useState<boolean>(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const handleInputBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) {
      inputRef.current?.focus();
    }
  }, [creating]);

  return (
    <div
      className={classnames(
        styles["tab-item"],
        actived ? styles.actived : null
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className={styles["tabs-item-input"]}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            e.key === "Enter" && handleInputBlur();
          }}
        />
      ) : (
        <>
          <span
            className={styles["tabs-item-name"]}
            onDoubleClick={!readonly ? handleDoubleClick : () => {}}
          >
            {name}
          </span>
          {!readonly ? (
            <Popconfirm
              title="确认删除改文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={(e) => {
                e?.stopPropagation();
                console.log("1111111");
                onRemove();
              }}
            >
              <span
                className={styles.remove}
                style={{ marginLeft: 5, display: "flex" }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
    </div>
  );
};