import { useMutation } from 'react-query';
import { determineInstance } from 'utils/helper';

const patch = async ({ url, payload, type, token = false, file = false }) => {
  const instance = determineInstance(type);
  let headers = {};
  if (token) {
    const token = localStorage.getItem('token');
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };
  }
  if (file) {
    headers = { ...headers, 'Content-Type': 'multipart/form-data' };
  }
  const { data } = await instance
    .patch(url, payload, { headers, responseType: file ? 'blob' : 'json' })
    .then((res) => {
      return res;
    })
    .catch(async (e) => {
      console.dir(e, { depth: null });
      throw e.response;
    });
  return data;
};

const usePatch = () => useMutation(patch);

export default usePatch;
