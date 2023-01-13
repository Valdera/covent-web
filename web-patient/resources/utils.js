import Cookies from "universal-cookie";

export const isTokenExists = () => {
  const cookies = new Cookies();
  return cookies.get("jwt") != null;
};

export const defaultHandleErr = (data, setMessage) => {
  console.log(data);

  try {
    setMessage(data.response.data.message);
  } catch (error) {
    setMessage("Error from server");
  }
};
