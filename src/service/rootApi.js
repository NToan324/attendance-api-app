import initApi from './initApi';
const api = [import.meta.env.REACT_APP_BACKEND_URL, 'localhost:3000'];
const rootApi = initApi(api[0] || api[1]);
export default rootApi;
