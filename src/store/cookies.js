import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, exp, option) => {
  return cookies.set(name, value, exp, {...option});
};

export const getCookie = (name) => {
  return cookies.get(name);
};
