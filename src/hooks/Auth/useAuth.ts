import type { LoginRequest } from "../../models/Auth/Requests/LoginRequest";
import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import * as authService from "../../api/Auth/authService";
import { setCredentials, logout as logoutAction } from "../../store/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { user, token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (request: LoginRequest) => {
    try {
      const response = await authService.login(request);

      dispatch(setCredentials(response));
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loading: false,
  };
};
