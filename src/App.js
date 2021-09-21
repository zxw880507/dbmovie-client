import "./styles/App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Login from "./components/Login";
import { ProvideAuth } from "./hooks/providers/Auth";
import {
  BrowserRouter as Router,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./hooks/providers/Auth";
import { getUsername } from "./helpers";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <CustomRoute path="/" />
        <Login />
        <Navbar />
        <Main />
      </Router>
    </ProvideAuth>
  );
}
function CustomRoute({ children, ...rest }) {
  const { isAuth, user } = useAuth().authState;

  const location = useLocation();

  const path =
    location.pathname === "/" && isAuth
      ? `/${getUsername(user.email)}`
      : location.pathname + location.search;

  return <Route {...rest}>{isAuth ? <Redirect to={path} /> : children}</Route>;
}
export default App;
