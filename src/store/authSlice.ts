import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../models/Auth/Responses/LoginResponse";

interface AuthState {
  user: { fullName: string; email: string; roles: string[] } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const token = localStorage.getItem("nexusTixToken");
  const userStr = localStorage.getItem("nexusTixUser");

  if (token && userStr) {
    return {
      token,
      user: JSON.parse(userStr),
      isAuthenticated: true,
    };
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { token, email, firstName, lastName, roles } = action.payload;

      const user = {
        email,
        fullName: `${firstName} ${lastName}`,
        roles: roles,
      };

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem("nexusTixToken", token);
      localStorage.setItem("nexusTixUser", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("nexusTixToken");
      localStorage.removeItem("nexusTixUser");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
