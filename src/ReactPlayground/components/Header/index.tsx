import { useContext } from "react";
import { PlaygroundContext } from "../../contexts/PlaygroundContext";
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

export default function Header() {
  const { theme, toggleTheme, files, showMinMap, setShowMinMap } =
    useContext(PlaygroundContext);

  const onToggleTheme = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!("startViewTransition" in document)) {
      toggleTheme();
      return;
    }
    const transiton = document.startViewTransition(toggleTheme);
    const x = e.clientX;
    const y = e.clientY;
    const targetRadius = Math.hypot(
      Math.max(window.innerWidth, window.innerWidth - x),
      Math.max(window.innerHeight, window.innerHeight - y)
    );
    transiton?.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0% at ${x}px ${y}px)`,
            `circle(${targetRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  };

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
          className={styles.operation}
          onClick={onToggleTheme}
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
