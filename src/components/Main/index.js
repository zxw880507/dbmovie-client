import React, { useState, useEffect } from "react";
import { Container, makeStyles, Toolbar } from "@material-ui/core";
import Header from "./Header";
import SwiperList from "./SwiperList";
import Favorites from "./Favorites";
import SearchResults from "./SearchResults";
import { ProvideFavorites } from "../../hooks/providers/Favorites";
import { useAuth } from "../../hooks/providers/Auth";
import { Switch, Route, useLocation } from "react-router-dom";
import { getUsername } from "../../helpers";
const useStyles = makeStyles({
  root: {
    minWidth: 960,
    padding: 0,
  },
  noMatch: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2em",
  },
});
export default function Main() {
  const classes = useStyles();
  const { authState } = useAuth();

  const [authPath, setAuthPath] = useState("/");

  useEffect(() => {
    const { user, isAuth } = authState;
    isAuth ? setAuthPath(`/${getUsername(user.email)}`) : setAuthPath("/");
  }, [authState]);

  return (
    <ProvideFavorites user={authState.user}>
      <Container maxWidth="lg" className={classes.root}>
        <Toolbar />
        <Switch>
          <Route exact path={authPath}>
            <Header />
            <SwiperList />
          </Route>
          <Route path={[`${authPath}/search`, "/search"]}>
            <SearchResults />
          </Route>
          {authState.isAuth && (
            <Route exact path={`${authPath}/favorites`}>
              <Favorites />
            </Route>
          )}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Container>
    </ProvideFavorites>
  );
}

function NoMatch() {
  const location = useLocation();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);
    return clearTimeout(timeout);
  }, []);
  return (
    !loading && (
      <div className={classes.noMatch}>
        <h1 style={{ fontSize: "5em" }}>Sorry, this one stays red.</h1>
        <h2 style={{ fontSize: "3em", marginBottom: "1em" }}>
          No match for <code>{location.pathname}</code>.
        </h2>
        <h3>
          The page you’re looking for doesn’t exist, but you’re not at a dead
          end. Here are a few options:
        </h3>
        <ul style={{ fontSize: "1.5em" }}>
          <li>Be sure you have the right url and try again</li>
          <li>Sign up or log in</li>
        </ul>
      </div>
    )
  );
}
