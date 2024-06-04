import { useMutation } from "react-query";
import { determineInstance, IInstanceType } from "utils/helper";

const deleteMutation = async ({
  url,
  type,
  token = false,
  adminToken = false,
}) => {
  const instance = determineInstance(type);
  let headers = {};
  if (token) {
    const accessToken = localStorage.getItem("token");
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }
  if (adminToken) {
    headers = { ...headers, "admin-api-key": "testApiKey" };
  }
  const { data } = await instance
    .delete(url, { headers })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.dir(e, { depth: null });
 
      throw e.response;
    });
  return data;
};

const useDelete = () => useMutation(deleteMutation);

export default useDelete;
