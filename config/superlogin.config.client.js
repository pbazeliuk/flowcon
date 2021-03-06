const serverUrl = process.env.SERVER_URL || (location.protocol.indexOf('https') === 0 ? location.origin : 'http://localhost:3001');

module.exports = {
  // An optional URL to API server, by default a current window location is used.
  serverUrl,
  // The base URL for the SuperLogin routes with leading and trailing slashes (defaults to '/auth')
  baseUrl: '/auth',
  // Specific endpoint for social authentication and social link popups (defaults to `${location.origin}${baseUrl}`)
  socialUrl: serverUrl + '/auth',
  // A list of API endpoints to automatically add the Authorization header to
  // By default the host the browser is pointed to will be added automatically
  endpoints: ['business-programming.ru', 'flowcon.js.org', 'flowcon.oknosoft.ru'],
  // Set this to true if you do not want the URL bar host automatically added to the list
  noDefaultEndpoint: false,
  // Where to save your session token: localStorage ('local') or sessionStorage ('session'), default: 'local'
  storage: 'local',
  // The authentication providers that are supported by your SuperLogin host
  providers: ['google', 'yandex', 'github', 'facebook'],
  // Sets when to check if the session is expired during the setup.
  // false by default.
  checkExpired: false,
  // A float that determines the percentage of a session duration, after which SuperLogin will automatically refresh the
  // token. For example if a token was issued at 1pm and expires at 2pm, and the threshold is 0.5, the token will
  // automatically refresh after 1:30pm. When authenticated, the token expiration is automatically checked on every
  // request. You can do this manually by calling superlogin.checkRefresh(). Default: 0.5
  refreshThreshold: 0.5,
  // правила работы с почтой
  email: {
    sendConfirmEmail: true,
    requireEmailConfirm: true,
    loginOnRegistration: false,
    //confirmEmailRedirectURL: '/confirm-email',
    confirmEmailRedirectURL: '/login',
  }
}
