import createRouteUrlProvider from 'utils/routeUrlProvider';

export const SIGN_IN = 'SIGN_IN';
export const GOOGLE_REDIRECT = 'GOOGLE_REDIRECT';

export const POLL_LIST = 'POLL_LIST';
export const POLL_SAVE = 'POLL_SAVE';

export const VOTE_LIST = 'VOTE_LIST';
export const VOTE_ANSWER = 'VOTE_ANSWER';
export const VOTE_RESULT = 'VOTE_RESULT';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(SIGN_IN, '/');
routeUrlProvider.set(GOOGLE_REDIRECT, '/google-redirect');

routeUrlProvider.set(POLL_LIST, '/polls');
routeUrlProvider.set(POLL_SAVE, '/poll/:pollId');

routeUrlProvider.set(VOTE_LIST, '/votes');
routeUrlProvider.set(VOTE_ANSWER, '/votes/:pollId');
routeUrlProvider.set(VOTE_RESULT, '/votes/:pollId/result');

export default routeUrlProvider;
