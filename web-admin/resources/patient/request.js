const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class PatientAPI {
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
      .post(`${this.host}/v1/patient/login`, body, {})
      .then((data) => {
        this.setToken(data.data.token);
        handleSuccess(data);
      })
      .catch(handleError);
  }

  async register(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/patient/register`, body, {})
      .then((data) => {
        this.setToken(data.data.token);
        handleSuccess(data);
      })
      .catch(handleError);
  }

  async getAllPatient(handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/patient`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getPatientById(id, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/patient/${id}`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async logout() {
    const cookies = new Cookies();
    cookies.remove("token", { path: "/" });
  }
}

export default PatientAPI;
