import createRouteUrlProvider from 'utils/routeUrlProvider';

export const LOGIN = 'LOGIN';
export const GOOGLE_REDIRECT = 'GOOGLE_REDIRECT';
export const DASHBOARD = 'DASHBOARD';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(LOGIN, '/');
routeUrlProvider.set(GOOGLE_REDIRECT, '/google-redirect');
routeUrlProvider.set(DASHBOARD, '/dashboard');

export default routeUrlProvider;
