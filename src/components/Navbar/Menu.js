import React, { useState, useRef, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { useAuth } from "../../hooks/providers/Auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    alignSelf: "center",
    margin: "0 1.5em",
    color: "#fff",
    borderColor: "#fff",
    opacity: 0.7,
    fontSize: "1em",
    textTransform: "lowercase",
    "&:hover": {
      opacity: 1,
    },
  },
  menuContainer: {
    position: "absolute",
    top: "120%",
    left: "50%",
    height: 0,
    overflow: "hidden",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(13, 37, 63, .1)",
    whiteSpace: "nowrap",
  },
  menuContainerShow: {
    opacity: 1,
    height: "8em",
    boxShadow:
      "inset 1px 1px 2em rgba(0,0,0,1), 0px 0px 0 2px rgba(255,255,255,.2)",
    transition: "all .5s ease-in-out",
  },
  menuContainerHidden: {
    opacity: 0,
    height: 0,
    transition: "all .5s ease-in-out",
  },
  menuItem: {
    width: "100%",
    fontSize: "1.2em",
    fontFamily: "Anton",
    color: "#fff",
    opacity: 0.7,
    textAlign: "center",
    padding: "1em 2em",
    cursor: "pointer",
    backgroundColor: "rgba(13, 37, 63, .9)",
    border: "none",
    "&:hover": {
      opacity: 1,
      backgroundColor: "rgba(255,255,255, .5)",
    },
  },
});
export default function UserMenu(props) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const history = useHistory();

  const { authState, userLogout } = useAuth();
  const handleClick = () => {
    setShow((prev) => !prev);
  };

  useEffect(() => {
    const handleClose = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClose, false);
    return () => {
      document.removeEventListener("click", handleClose, false);
    };
  }, []);

  return (
    <div style={{ position: "relative", height: "100%" }} ref={ref}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        className={classes.button}
        onClick={handleClick}
      >
        {authState.user.email}
      </Button>

      <div
        className={`${classes.menuContainer} ${
          show ? classes.menuContainerShow : classes.menuContainerHidden
        }`}
      >
        <button
          className={classes.menuItem}
          onClick={() => {
            history.push(`${props.url}/favorites`);
            setShow(false);
          }}
        >
          My favorates
        </button>
        <button
          className={classes.menuItem}
          onClick={() => {
            handleClick();
            userLogout().then(() => history.push("/"));
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
