const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class AdminAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("token")}`;
  }

  setToken(token) {
    const cookies = new Cookies();
    cookies.set("token", token);
  }

  async login(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/admin/login`, body, {})
      .then((data) => {
        this.setToken(data.data.token);
        handleSuccess(data);
      })
      .catch(handleError);
  }

  async register(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/admin/register`, body, {})
      .then((data) => {
        this.setToken(data.data.token);
        handleSuccess(data);
      })
      .catch(handleError);
  }

  async logout() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
  }
}

export default AdminAPI;
