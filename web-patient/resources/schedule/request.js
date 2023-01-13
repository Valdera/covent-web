const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class ScheduleAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("jwt")}`;
  }

  async createSchedule(body, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(`${this.host}/v1/schedule/`, body, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllSchedule(handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/schedule/`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getScheduleById(id, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/schedule/${id}`, {})
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllScheduleByDoctorId(
    id,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .get(`${this.host}/v1/schedule/doctor/${id}`, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }
}

export default ScheduleAPI;
