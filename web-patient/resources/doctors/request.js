const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class DoctorAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("jwt")}`;
  }

  async createDoctor(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/doctor/`, body, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllDoctor(handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/doctor/`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getDoctorById(id, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/doctor/${id}`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllDoctorBySpecializationId(
    id,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .get(`${this.host}/v1/doctor/specialization/${id}`, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }
}

export default DoctorAPI;
