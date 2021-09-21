import { useState, useEffect } from "react";
import axios from "axios";

export default function useProvideAuth() {
  const [showLogin, setShowLogin] = useState(false);
  const [authState, setAuthState] = useState({
    isAuth: false,
    user: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    axios.get("/user/login", { params: { accessToken } }).then((res) => {
      if (res.data.email) {
        setAuthState({ isAuth: true, user: res.data });
      }
    });
  }, []);

  const toggleLoginWindow = () => {
    if (showLogin) {
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  const userLogin = (data) => {
    setAuthState({ isAuth: true, user: data });
    localStorage.setItem("token", data.accessToken);
    toggleLoginWindow();
  };

  const userLogout = () => {
    return axios.post("/user/logout").then(() => {
      setAuthState({ isAuth: false, user: null });
      localStorage.removeItem("token");
    });
  };

  return { showLogin, authState, toggleLoginWindow, userLogin, userLogout };
}
