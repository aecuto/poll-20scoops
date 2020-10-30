import createApiUrlProvider from 'utils/apiUrlProvider';
import env from 'utils/env';

export const LOGIN = 'LOGIN';

const apiUrlProvider = createApiUrlProvider();
apiUrlProvider.setBaseUrl(env.getAPIUrl() || 'localhost');

// auth
apiUrlProvider.set(LOGIN, '/login');

export default apiUrlProvider;
