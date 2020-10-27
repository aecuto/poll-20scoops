import { fetchPost, fetchGet } from 'utils/services/fetch';

import apiUrlProvider, { LOGIN, ME } from 'constants/api-paths';

export const login = values => {
  return fetchPost(apiUrlProvider.get(LOGIN), values);
};

export const getMe = () => {
  return fetchGet(apiUrlProvider.get(ME), {}, { isAuth: true });
};
