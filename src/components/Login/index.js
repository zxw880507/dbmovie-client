import React, { useState } from "react";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import { IconButton, makeStyles } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import LoginForm from "./LoginForm";
import "../../styles/login.css";
import RegisterForm from "./RegisterForm";
import classNames from "classnames";
import { useAuth } from "../../hooks/providers/Auth";

const useStyles = makeStyles({
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: "0 0.5em",
    color: "#fff",
    borderColor: "#fff",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
    zIndex: 1,
  },
});
export default function Login() {
  const classes = useStyles();
  const { showLogin, toggleLoginWindow } = useAuth();
  const [tab, setTab] = useState("login");
  const tabsClass = classNames("login-tabs", `${tab}-tab-selected`);
  const onChange = (e) => {
    setTab(e.target.dataset.value);
  };

  return (
    <CSSTransition
      in={showLogin}
      timeout={500}
      classNames="my-login"
      unmountOnExit
    >
      <div className="login-window">
        <div className="login-container">
          <IconButton className={classes.button} onClick={toggleLoginWindow}>
            <HighlightOffOutlinedIcon fontSize="large" />
          </IconButton>
          <div className="login-heading-box">
            <h1 className="login-heading-title">WELCOME TO</h1>
            <p>DB MOVIE</p>
          </div>
          <div className="login-content-box">
            <div className={tabsClass} onClick={onChange}>
              <span data-value="login" className="login-tab">
                Login
              </span>
              <span data-value="register" className="register-tab">
                Register
              </span>
            </div>
            <div className="form-container">
              {tab === "login" ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
