import { usePlayGroundContext } from "../../contexts/PlaygroundContext";
import logo from "./icons/logo.svg";
import styles from "./index.module.scss";
import {
  DownloadOutlined,
  GithubOutlined,
  GlobalOutlined,
  MacCommandOutlined,
  MoonOutlined,
  ReloadOutlined,
  ShareAltOutlined,
  SunOutlined
} from "@ant-design/icons";
import copy from "copy-to-clipboard";
import { Dropdown, Switch, message } from "antd";
import { downloadFiles } from "../../utils";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/configs";

export default function Header() {
  const { theme, toggleTheme, files, showMinMap, setShowMinMap } =
    usePlayGroundContext();
  const { t } = useTranslation();

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
          <div>{t("header.formatter")}</div>
          <div className={styles.shortcut}>
            <MacCommandOutlined className={styles.keycode} />
            <div className={styles.keycode} style={{ marginLeft: 3 }}>
              J
            </div>
          </div>
        </div>
        <Switch
          checked={showMinMap}
          checkedChildren={t("header.minimap")}
          unCheckedChildren={t("header.minimap")}
          onChange={() => setShowMinMap(!showMinMap)}
        />
        <span
          title={theme === "light" ? t("header.dark") : t("header.light")}
          className={styles.operation}
          onClick={onToggleTheme}
        >
          {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
        </span>
        <Dropdown
          menu={{
            onClick: ({ key }) => {
              i18n.changeLanguage(key);
            },
            items: [
              {
                key: "zh",
                label: <span>{t("header.chinese")}</span>
              },
              {
                key: "en",
                label: <span>{t("header.english")}</span>
              }
            ]
          }}
          placement="bottom"
        >
          <GlobalOutlined className={styles.operation} />
        </Dropdown>
        <ShareAltOutlined
          title={t("header.shareLink")}
          className={styles.operation}
          onClick={() => {
            copy(window.location.href);
            message.success(t("header.linkCoppied"));
          }}
        />
        <ReloadOutlined
          title={t("header.reload")}
          className={styles.operation}
          onClick={() => {
            window.location.reload();
          }}
        />
        <DownloadOutlined
          title={t("header.downloadFile")}
          className={styles.operation}
          onClick={async () => {
            await downloadFiles(files);
            message.success(t("header.downloadFile"));
          }}
        />

        <a
          href="https://github.com/BRUCE-JIN002/playground-test.git"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          <GithubOutlined
            title={t("header.github")}
            className={styles.operation}
          />
        </a>
      </div>
    </div>
  );
}
