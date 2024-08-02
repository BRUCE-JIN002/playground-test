import { useContext } from "react";
import { PlaygroundContext } from "../../contexts/PlaygroundContext";
import logo from "./icons/logo.svg";
import styles from "./index.module.scss";
import {
  DownloadOutlined,
  GithubOutlined,
  MacCommandOutlined,
  MoonOutlined,
  ReloadOutlined,
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
    transiton.ready.then(() => {
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
        <div className={styles.shortcutContainer}>
          <div>Formatter</div>
          <div className={styles.shortcut}>
            <MacCommandOutlined className={styles.keycode} />
            <div className={styles.keycode} style={{ marginLeft: 3 }}>
              J
            </div>
          </div>
        </div>
        <Switch
          checked={showMinMap}
          checkedChildren="MiniMap"
          unCheckedChildren="MiniMap"
          onChange={() => setShowMinMap(!showMinMap)}
        />
        <span
          title={theme === "light" ? "Dark" : "Light"}
          className={styles.operation}
          onClick={onToggleTheme}
        >
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </span>
        <ShareAltOutlined
          title="Share Link"
          className={styles.operation}
          onClick={() => {
            copy(window.location.href);
            message.success("Shared Link Coppied!");
          }}
        />
        <ReloadOutlined
          title="Reload"
          className={styles.operation}
          onClick={() => {
            window.location.reload();
          }}
        />
        <DownloadOutlined
          title="Download Files"
          className={styles.operation}
          onClick={async () => {
            await downloadFiles(files);
            message.success("Download Files Success!");
          }}
        />

        <a
          href="https://github.com/BRUCE-JIN002/playground-test.git"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          <GithubOutlined title="Github" className={styles.operation} />
        </a>
      </div>
    </div>
  );
}
