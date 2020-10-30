import createRouteUrlProvider from 'utils/routeUrlProvider';

export const LOGIN = 'LOGIN';
export const DASHBOARD = 'DASHBOARD';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(LOGIN, '/');
routeUrlProvider.set(DASHBOARD, '/dashboard');

export default routeUrlProvider;
