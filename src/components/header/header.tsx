import React from "react";
import { Button } from "antd";
import styles from "./header.module.css";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();

  function handleLoginButtonClick() {
    history.push("/login");
  }

  return (
    <div className={styles.header}>
      <span className={styles.logo}>BeeJee</span>
      <Button type="primary" onClick={handleLoginButtonClick}>
        Login
      </Button>
    </div>
  );
}

export default Header;
