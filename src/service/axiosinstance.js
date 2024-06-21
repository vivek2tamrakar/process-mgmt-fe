import axios from "axios";
import { REFRESH_TOKEN } from "../constants/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const authInstance = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

export const detailsInstance = axios.create({
  baseURL: process.env.REACT_APP_DETAILS_URL,
});

let isRefreshing = false;

const interceptorHandling = (axiosInstance, token, navigate) => {
  const resInterceptor = (response) => response;

  const errInterceptor = async (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.status === 401 ||
      error.status === 400
    ) {
      if (!isRefreshing && error.response.data.code === "CS-2") {
        isRefreshing = true;
        await authInstance
          .post(REFRESH_TOKEN, { refreshToken: token })
          .then((response) => {
            isRefreshing = false;
            localStorage.setItem("token", response.data.token);
            return response;
          })
          .catch((err) => {
            localStorage.clear();
            throw err;
          });
      }
    }
    return Promise.reject(error);
  };

  const interceptor = axiosInstance.interceptors.response.use(
    resInterceptor,
    errInterceptor
  );
  return () => axiosInstance.interceptors.response.eject(interceptor);
};

export const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => interceptorHandling(authInstance, token, navigate), [token]);
  useEffect(
    () => interceptorHandling(detailsInstance, token, navigate),
    [token]
  );

  return children;
};
