import createRouteUrlProvider from 'utils/routeUrlProvider';

export const SIGN_IN = 'SIGN_IN';
export const GOOGLE_REDIRECT = 'GOOGLE_REDIRECT';
export const POLL_CREATE = 'POLL_CREATE';
export const VOTE = 'VOTE';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(SIGN_IN, '/');
routeUrlProvider.set(GOOGLE_REDIRECT, '/google-redirect');
routeUrlProvider.set(POLL_CREATE, '/create');
routeUrlProvider.set(VOTE, '/vote');

export default routeUrlProvider;
