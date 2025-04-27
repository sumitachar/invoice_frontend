// Token key constants
const ACCESS_TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Set a token
export const setToken = (key, value) => {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
};

// Get a token
export const getToken = (key) => localStorage.getItem(key);

// Remove both tokens
export const removeTokens = () => {
  [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY].forEach((key) => localStorage.removeItem(key));
};

// Specific getters/setters
export const setAuthToken = (token) => setToken(ACCESS_TOKEN_KEY, token);
export const setRefreshToken = (refreshToken) => setToken(REFRESH_TOKEN_KEY, refreshToken);
export const getAuthToken = () => getToken(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => getToken(REFRESH_TOKEN_KEY);
