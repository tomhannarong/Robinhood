import { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { COOKIE_RECENT_USER } from "../constants";

const useLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInCookie = getCookie(COOKIE_RECENT_USER);
    if (loggedInCookie) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username: string) => {
    setCookie(COOKIE_RECENT_USER, username, {
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: "/",
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    deleteCookie(COOKIE_RECENT_USER);
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    login,
    logout,
  };
};

export default useLoggedIn;
