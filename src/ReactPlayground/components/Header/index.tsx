import { useContext } from "react";
import { PlaygroundContext } from "../../contests/PlaygroundContext";
import logo from "./icons/logo.svg";
import styles from "./index.module.scss";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { Switch, message } from "antd";
import { downloadFiles } from "../../utils";
import classNames from "classnames";

export default function Header() {
  const { theme, toggleTheme, files, showMinMap, setShowMinMap } =
    useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        <Switch
          checked={showMinMap}
          checkedChildren="缩略图"
          unCheckedChildren="缩略图"
          onChange={() => setShowMinMap(!showMinMap)}
        />
        <span
          title={theme === "light" ? "切换暗色主题" : "切换亮色主题"}
          className={classNames(styles.theme, styles.operation)}
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </span>
        <ShareAltOutlined
          title="分享链接"
          className={styles.operation}
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制");
          }}
        />
        <DownloadOutlined
          title="下载代码"
          className={styles.operation}
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
}
