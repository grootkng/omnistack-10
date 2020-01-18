import axios from 'axios';

import { port, androidEmulatorIP, deviceIP } from './utils/ips';

const api = axios.create({
  baseURL: `${ androidEmulatorIP }:${ port }`,
});

export default api;