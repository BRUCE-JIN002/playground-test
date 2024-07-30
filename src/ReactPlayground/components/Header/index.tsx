import logo from "./icons/logo.svg";
import styles from "./index.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span>React Playground</span>
      </div>
    </div>
  );
}
