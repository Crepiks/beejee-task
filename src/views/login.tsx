import React from "react";
import styles from "./login.module.css";
import { useState } from "react";
import LoginForm from "../components/login-form/login-form";
import { LoginDto } from "../dto/login.dto";

function LoginView() {
  const [loading, setLoading] = useState(false);

  async function login(payload: LoginDto): Promise<void> {
    setLoading(true);
    console.log(payload);
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
