import { useState } from "react";
import axios from "axios";

export default function useRegister(props) {
  const { userLogin } = props;
  const [input, setInput] = useState({
    email: "",
    password: "",
    repassword: "",
  });
  const [isWarning, setIswarning] = useState({
    email: null,
    password: null,
    repassword: null,
  });
  const [errMsg, setErrMsg] = useState(null);

  const resetErr = () => {
    setErrMsg(null);
  };
  const changeInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.dataset.type]: e.target.value }));
  };

  const checkIsWarning = () => {
    const setByRegex = (regex, type) => {
      setIswarning((prev) => ({
        ...prev,
        [type]: !regex.test(input[type]),
      }));
    };
    for (let type in input) {
      switch (type) {
        case "email":
          setByRegex(/^\S+@\S+\.\S+$/, type);
          break;
        case "password":
          setByRegex(/^.{6,}/, type);
          break;
        case "repassword":
          setByRegex(new RegExp(`^${input.password}$`), type);
          break;
        default:
          break;
      }
    }
  };
  const signUp = (e) => {
    e.preventDefault();
    checkIsWarning();
    if (Object.keys(isWarning).every((key) => isWarning[key] === false)) {
      
      axios
        .post("/user/register", input)
        .then((res) => {
          userLogin(res.data);
        })
        .catch((err) => setErrMsg(err.response.data.msg));
    }
  };

  return {
    input,
    isWarning,
    errMsg,
    resetErr,
    changeInput,
    checkIsWarning,
    signUp,
  };
}
