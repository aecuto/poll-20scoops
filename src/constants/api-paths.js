import createApiUrlProvider from 'utils/apiUrlProvider';
import env from 'utils/env';

export const LOGIN = 'LOGIN';
export const ME = 'ME';

export const USER_LIST = 'USER_LIST';
export const USER_CREATE = 'USER_CREATE';
export const USER_EDIT = 'USER_EDIT';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_DELETE = 'USER_DELETE';

export const PRODUCT_LIST = 'PRODUCT_LIST';
export const PRODUCT_CREATE = 'PRODUCT_CREATE';
export const PRODUCT_EDIT = 'PRODUCT_EDIT';
export const PRODUCT_UPDATE = 'PRODUCT_UPDATE';
export const PRODUCT_DELETE = 'PRODUCT_DELETE';

const apiUrlProvider = createApiUrlProvider();
apiUrlProvider.setBaseUrl(env.getAPIUrl() || 'localhost');

// auth
apiUrlProvider.set(LOGIN, '/login');
apiUrlProvider.set(ME, '/me');

// user
apiUrlProvider.set(USER_LIST, '/users');
apiUrlProvider.set(USER_CREATE, '/users');
apiUrlProvider.set(USER_EDIT, '/users/:userId/edit');
apiUrlProvider.set(USER_UPDATE, '/users/:userId/update');
apiUrlProvider.set(USER_DELETE, '/users/:userId/delete');

// products
apiUrlProvider.set(PRODUCT_LIST, '/products');
apiUrlProvider.set(PRODUCT_CREATE, '/products');
apiUrlProvider.set(PRODUCT_EDIT, '/products/:productId/edit');
apiUrlProvider.set(PRODUCT_UPDATE, '/products/:productId/update');
apiUrlProvider.set(PRODUCT_DELETE, '/products/:productId/delete');

export default apiUrlProvider;
