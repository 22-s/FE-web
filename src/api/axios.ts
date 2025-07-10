import axios from "axios";

const instance = axios.create({
  //baseURL: "https://yg25j4rhll.execute-api.ap-northeast-2.amazonaws.com",
  //baseURL: "https://port-0-twotwos-m69bdqoxaa7c9913.sel4.cloudtype.app"
  baseURL: "http://localhost:8080"
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
