import { useContext } from "react";
import { PlaygroundContext } from "../../PlaygroundContext";
import logo from "./icons/logo.svg";
import styles from "./index.module.scss";
import {
  DownloadOutlined,
  MoonOutlined,
  ShareAltOutlined,
  SunOutlined
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { message } from "antd";
import { downloadFiles } from "../../utils";

export default function Header() {
  const { theme, setTheme, files } = useContext(PlaygroundContext);

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>React Playground</span>
      </div>
      <div className={styles.links}>
        {theme === "light" && (
          <MoonOutlined
            title="切换暗色主题"
            className={styles.theme}
            onClick={() => setTheme("dark")}
          />
        )}
        {theme === "dark" && (
          <SunOutlined
            title="切换亮色主题"
            className={styles.theme}
            onClick={() => setTheme("light")}
          />
        )}
        <ShareAltOutlined
          title="分享链接"
          onClick={() => {
            copy(window.location.href);
            message.success("分享链接已复制");
          }}
        />
        <DownloadOutlined
          title="下载代码"
          onClick={async () => {
            await downloadFiles(files);
            message.success("下载完成");
          }}
        />
      </div>
    </div>
  );
}
