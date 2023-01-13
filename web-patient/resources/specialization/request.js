const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class SpecializationAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("jwt")}`;
  }

  async createSpecialization(
    body,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .post(`${this.host}/v1/specialization/`, body, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllSpecialization(handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/specialization/`, {})
      .then(handleSuccess)
      .catch(handleError);
  }
}

export default SpecializationAPI;
