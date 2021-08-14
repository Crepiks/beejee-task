import { LoginDto } from "../dto/login.dto";
import request from "./request";

const tokenKey = "token";

class UserRepository {
  static async login(payload: LoginDto): Promise<string> {
    const form = new FormData();
    form.append("username", payload.username);
    form.append("password", payload.password);

    const res = await request({
      url: "/login?developer=sayazhan",
      method: "POST",
      data: form,
    });

    return res.data.message.token;
  }

  static getToken(): string {
    return localStorage.getItem(tokenKey) || "";
  }

  static setToken(token: string) {
    localStorage.setItem(tokenKey, token);
  }

  static clearToken() {
    localStorage.removeItem(tokenKey);
  }
}

export default UserRepository;
