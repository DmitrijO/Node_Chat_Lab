const TOKEN = 'km_token';
const USER = 'km_user';

class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token, user) {
    localStorage.setItem(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem(TOKEN) !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Get a User JSON string value.
   *
   * @returns {string}
   */

  static getUser() {
    return localStorage.getItem(USER);
  }

}

export default Auth;