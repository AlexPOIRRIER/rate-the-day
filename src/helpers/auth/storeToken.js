/**
 *
 * @param {String} token
 *
 * @returns
 */

const storeToken = token => localStorage.setItem("token", token);

export default storeToken;
