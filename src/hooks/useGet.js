import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { determineInstance } from "../utils/helper";

const get = async ({
  url,
  type,
  token = false,
  adminToken = false,
  file = false,
}) => {
  const instance = determineInstance(type);
  let headers = {};

  if (token) {
    const tokenValue = localStorage.getItem("token");

    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenValue}`,
    };
  }

  if (adminToken) {
    headers = { ...headers, "admin-api-key": "testApiKey" };
  }

  try {
    const { data } = await instance.get(url, {
      headers,
      responseType: file ? "blob" : "json",
      params: "",
    });
    return data;
  } catch (e) {
    if (e?.response?.status === 400 || e?.response?.status === 403) {
      localStorage.clear();
    }
    console.dir(e, { depth: null });
    throw e.response;
  }
};

const useGet = () => {
  const navigate = useNavigate();

  const mutation = useMutation(get, {
    onError: (error) => {
      if (error.status === 400 || error.status === 403) {
        navigate("/login");
      }
    },
  });

  return mutation;
};

export default useGet;
