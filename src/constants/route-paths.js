import createRouteUrlProvider from 'utils/routeUrlProvider';

export const LOGIN = 'LOGIN';
export const DASHBOARD = 'DASHBOARD';

export const GOOGLE_REDIRECT = 'GOOGLE_REDIRECT';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(LOGIN, '/');
routeUrlProvider.set(GOOGLE_REDIRECT, '/google-redirect');

routeUrlProvider.set(DASHBOARD, '/dashboard');

export default routeUrlProvider;
