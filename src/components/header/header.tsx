import React, { FunctionComponent } from "react";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import styles from "./header.module.css";

interface Props {
  authenticated: boolean;
  onLogout: () => void;
}

const Header: FunctionComponent<Props> = ({ authenticated, onLogout }) => {
  const history = useHistory();

  function getLogoutButton() {
    return <Button onClick={onLogout}>Log Out</Button>;
  }

  function getLoginButton() {
    return (
      <Button type="primary" onClick={handleLoginButtonClick}>
        Log In
      </Button>
    );
  }

  function handleLoginButtonClick() {
    history.push("/login");
  }

  return (
    <div className={styles.header}>
      <span className={styles.logo}>BeeJee</span>
      {authenticated ? getLogoutButton() : getLoginButton()}
    </div>
  );
};

export default Header;
