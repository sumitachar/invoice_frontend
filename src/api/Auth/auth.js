import { axiosAuth } from "api/axios";
import { getRefreshToken } from "utils/tokenUtils";
import { getAuthToken } from "utils/tokenUtils";
import { removeTokens } from "utils/tokenUtils";
import { setRefreshToken } from "utils/tokenUtils";
import { setAuthToken } from "utils/tokenUtils";

// Login and store tokens
export const loginUser = async (email, password) => {
  try {
    const response = await axiosAuth.post("/auth/login", { email, password });
    const { access_token, refresh_token } = response.data;

    setAuthToken(access_token);
    setRefreshToken(refresh_token);

    return response.data;
  } catch (error) {
    console.error("🔒 Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout and clear tokens
export const logoutUser = () => {
  removeTokens();
  // Optional redirect
  // window.location.href = '/login';
};

// Try to refresh token
const tryRefreshToken = async () => {
  const refresh_token = getRefreshToken();
  console.log("tryRefreshToken")
  if (!refresh_token) return { valid: false, user: null };

  try {
    const response = await axiosAuth.post("/auth/refresh", { refresh_token });
    const { access_token } = response.data;

    setAuthToken(access_token);

    const validate = await axiosAuth.get("/auth/validate", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    return { valid: true, user: validate.data.user };
  } catch (err) {
    console.error("🔁 Refresh token failed:", err.response?.data || err.message);
    removeTokens();
    return { valid: false, user: null };
  }
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const token = getAuthToken();
  console.log("isAuthenticated")
  if (!token) return await tryRefreshToken();

  try {
    const response = await axiosAuth.get("/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { valid: true, user: response.data.user };
  } catch (error) {
    console.warn("⚠️ Token validation failed, trying refresh...");
    return await tryRefreshToken();
  }
};
