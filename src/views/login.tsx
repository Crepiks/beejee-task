import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import LoginForm from "../components/login-form/login-form";
import { LoginDto } from "../dto/login.dto";
import styles from "./login.module.css";
import UserRepository from "../data/user.repository";

function LoginView() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function login(payload: LoginDto): Promise<void> {
    setLoading(true);

    const token = await UserRepository.login(payload);
    setLoading(false);
    if (token) {
      UserRepository.setToken(token);
      navigateToTasksPage();
    } else {
      showErrorNotification();
    }
  }

  function navigateToTasksPage() {
    history.push("/");
  }

  function showErrorNotification() {
    notification.error({
      message: "Invalid credentials",
      description: "The provided credentials are invalid",
    });
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h3 className={styles.title}>Login</h3>
        <LoginForm loading={loading} onSubmit={login} />
      </div>
    </div>
  );
}

export default LoginView;
