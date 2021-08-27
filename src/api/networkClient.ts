import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

export default {
  post: (url: string, data: object) => axios.post(url, data)
};
