const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class AdminAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("jwt")}`;
  }

  setToken(token) {
    const cookies = new Cookies();
    cookies.set("jwt", token);
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
    cookies.remove("jwt");
  }
}

export default AdminAPI;
