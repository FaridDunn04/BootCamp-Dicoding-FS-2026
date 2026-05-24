import React from 'react';
import {
  getAccessToken,
  getUserLogged,
  login as loginRequest,
  putAccessToken,
  register as registerRequest,
  removeAccessToken,
} from '../utils/network-data';

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  React.useEffect(() => {
    let isActive = true;

    const bootstrapUser = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        if (isActive) {
          setIsAuthReady(true);
        }

        return;
      }

      const userResponse = await getUserLogged();

      if (!isActive) {
        return;
      }

      if (userResponse.error) {
        removeAccessToken();
        setAuthedUser(null);
      } else {
        setAuthedUser(userResponse.data);
      }

      setIsAuthReady(true);
    };

    bootstrapUser();

    return () => {
      isActive = false;
    };
  }, []);

  const login = async ({ email, password }) => {
    const response = await loginRequest({ email, password });

    if (response.error) {
      return response;
    }

    putAccessToken(response.data.accessToken);

    const userResponse = await getUserLogged();

    if (!userResponse.error) {
      setAuthedUser(userResponse.data);
    }

    return response;
  };

  const register = async ({ name, email, password }) => registerRequest({ name, email, password });

  const logout = () => {
    removeAccessToken();
    setAuthedUser(null);
  };

  const value = React.useMemo(
    () => ({ authedUser, isAuthReady, login, register, logout }),
    [authedUser, isAuthReady],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };