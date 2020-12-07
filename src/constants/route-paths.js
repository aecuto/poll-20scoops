import createRouteUrlProvider from 'utils/routeUrlProvider';

export const SIGN_IN = 'SIGN_IN';
export const GOOGLE_REDIRECT = 'GOOGLE_REDIRECT';

export const POLL_LIST = 'POLL_LIST';
export const POLL_SAVE = 'POLL_SAVE';

export const VOTE = 'VOTE';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(SIGN_IN, '/');
routeUrlProvider.set(GOOGLE_REDIRECT, '/google-redirect');

routeUrlProvider.set(POLL_LIST, '/polls');
routeUrlProvider.set(POLL_SAVE, '/poll/:pollId');

routeUrlProvider.set(VOTE, '/vote');

export default routeUrlProvider;
