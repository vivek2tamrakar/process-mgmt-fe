import { useMutation } from 'react-query';
import { determineInstance } from 'utils/helper';
const get = async ({ url, type, token = false, adminToken = false, file = false }) => {
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
  const { data } = await instance

    .get(url, { headers, responseType: file ? 'blob' : 'json', params: '' })
    .then((res) => {
      return res;
    })
    .catch(async (e) => {
      if (e?.response?.status == 400 || e?.response?.status === 403) {
        localStorage.clear();
      }
      console.dir(e, { depth: null });
      throw e.response;
    });
  return data;
};
// const navigate= useNavigate();

const useGet = () => useMutation(get);

export default useGet;
