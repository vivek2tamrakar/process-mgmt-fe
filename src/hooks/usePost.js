// import { AxiosError, AxiosResponse } from 'axios'
// import { type } from 'os'
import { useMutation } from 'react-query';
import { determineInstance } from 'utils/helper';
const post = async ({ url, payload, type, token = false, adminToken = false, file = false }) => {
  const instance = determineInstance(type);
  let headers = {};
  if (token) {
    const token = localStorage.getItem('token');
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }
  if (adminToken) {
    headers = { ...headers, 'admin-api-key': 'testApiKey' };
  }
  if (file) {
    headers = { ...headers, 'Content-Type': 'multipart/form-data' };
  }
  const { data } = await instance
    .post(url, payload, { headers, responseType: file ? 'blob' : 'json' })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.dir(e, { depth: null });
      throw e.response;
    });
  return data;
};

const usePost = () => useMutation(post);

export default usePost;
