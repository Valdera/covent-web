const axios = require("axios");
import Cookies from "universal-cookie";
import config from "../../config/config";

class AppointmentAPI {
  constructor() {
    this.host = config.SERVER_ADDR;
  }

  getBearer() {
    const cookies = new Cookies();
    return `Bearer ${cookies.get("token")}`;
  }

  async createAppointment(
    body,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    console.log(this.getBearer());
    await axios
      .post(`${this.host}/v1/appointment/`, body, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllAppointmentByPatient(
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .get(`${this.host}/v1/appointment/patient/get/me`, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async getAllAppointment(handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .get(`${this.host}/v1/appointment`, {
        headers: { Authorization: this.getBearer() },
      })
      .then(handleSuccess)
      .catch(handleError);
  }

  async acceptAppointment(
    id,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .post(
        `${this.host}/v1/appointment/accept/${id}`,
        {},
        {
          headers: { Authorization: this.getBearer() },
        }
      )
      .then(handleSuccess)
      .catch(handleError);
  }

  async cancelAppointment(
    id,
    handleSuccess = () => {},
    handleError = () => {}
  ) {
    await axios
      .post(
        `${this.host}/v1/appointment/cancel/${id}`,
        {},
        {
          headers: { Authorization: this.getBearer() },
        }
      )
      .then(handleSuccess)
      .catch(handleError);
  }

  async doneAppointment(id, handleSuccess = () => {}, handleError = () => {}) {
    await axios
      .post(
        `${this.host}/v1/appointment/done/${id}`,
        {},
        {
          headers: { Authorization: this.getBearer() },
        }
      )
      .then(handleSuccess)
      .catch(handleError);
  }
}

export default AppointmentAPI;
