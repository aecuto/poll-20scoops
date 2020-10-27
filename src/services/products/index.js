import {
  fetchPost,
  fetchGet,
  fetchPut,
  fetchDelete
} from 'utils/services/fetch';

import apiUrlProvider, {
  PRODUCT_LIST,
  PRODUCT_CREATE,
  PRODUCT_EDIT,
  PRODUCT_UPDATE,
  PRODUCT_DELETE
} from 'constants/api-paths';

export const create = values => {
  return fetchPost(apiUrlProvider.get(PRODUCT_CREATE), values, {
    isAuth: true
  });
};

export const getList = query => {
  return fetchGet(apiUrlProvider.get(PRODUCT_LIST), query, { isAuth: true });
};

export const getById = productId => {
  return fetchGet(
    apiUrlProvider.get(PRODUCT_EDIT, { productId }),
    {},
    { isAuth: true }
  );
};

export const update = (productId, values) => {
  return fetchPut(apiUrlProvider.get(PRODUCT_UPDATE, { productId }), values, {
    isAuth: true
  });
};

export const remove = productId => {
  return fetchDelete(
    apiUrlProvider.get(PRODUCT_DELETE, { productId }),
    {},
    {
      isAuth: true
    }
  );
};
