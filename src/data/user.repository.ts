import { LoginDto } from "../dto/login.dto";
import request from "./request";

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
}

export default UserRepository;
