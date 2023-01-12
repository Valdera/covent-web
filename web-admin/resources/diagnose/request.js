const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class DiagnoseAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("token")}`;
  }

  async createDiagnose(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/diagnose/`, body, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllDiagnoseByPatientId(
    id,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .get(`${this.host}/v1/diagnose/patient/${id}`, {})
      .then(handleSuccess)
      .catch(handleError);
  }
}

export default DiagnoseAPI;
