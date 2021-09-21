import { useState } from "react";
import axios from "axios";

export default function useLogin(props) {
  const [input, setInput] = useState({ email: null, password: null });
  const [alerts, setAlerts] = useState({ email: null, password: null });

  const changeInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.dataset.type]: e.target.value }));
  };

  const resetAlerts = () => {
    setAlerts({ email: null, password: null });
  };
  const login = (e) => {
    e.preventDefault();
    if (Object.values(input).every((el) => el)) {
      axios
        .post("/user/login", input)
        .then((res) => {
          props.userLogin(res.data);
        })
        .catch((err) => {
          setAlerts((prev) => ({ ...prev, ...err.response.data }));
        });
    } else {
      setAlerts({
        email: "Email cannot be null or empty.",
        password: "Password cannot be null or empty.",
      });
    }
  };

  return { alerts, changeInput, resetAlerts, login };
}
