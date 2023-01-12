import Cookies from "universal-cookie";

export const isTokenExists = () => {
  const cookies = new Cookies();
  return cookies.get("token") != null;
};

export const defaultHandleErr = (data, setMessage) => {
  console.log(data);
  if (data.response.data.message) {
    setMessage(data.response.data.message);
  } else {
    setMessage("Error from server");
  }
};
