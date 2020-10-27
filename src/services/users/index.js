import {
  fetchPost,
  fetchGet,
  fetchPut,
  fetchDelete
} from 'utils/services/fetch';

import apiUrlProvider, {
  USER_LIST,
  USER_CREATE,
  USER_EDIT,
  USER_UPDATE,
  USER_DELETE
} from 'constants/api-paths';

export const create = values => {
  return fetchPost(apiUrlProvider.get(USER_CREATE), values, { isAuth: true });
};

export const getList = query => {
  return fetchGet(apiUrlProvider.get(USER_LIST), query, { isAuth: true });
};

export const getById = userId => {
  return fetchGet(
    apiUrlProvider.get(USER_EDIT, { userId }),
    {},
    { isAuth: true }
  );
};

export const update = (userId, values) => {
  return fetchPut(apiUrlProvider.get(USER_UPDATE, { userId }), values, {
    isAuth: true
  });
};

export const remove = userId => {
  return fetchDelete(
    apiUrlProvider.get(USER_DELETE, { userId }),
    {},
    {
      isAuth: true
    }
  );
};
