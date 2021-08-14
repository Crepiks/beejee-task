import React from "react";
import { Button } from "antd";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>BeeJee</span>
      <Button type="primary">Login</Button>
    </div>
  );
}

export default Header;
