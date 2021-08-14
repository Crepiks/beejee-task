import React from "react";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.logo}>BeeJee</span>
      <Link to="/login" className={styles.loginButton}>Login</Link>
    </div>
  );
}

export default Header;
