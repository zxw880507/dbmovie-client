import React from "react";
import { Button, Grid, IconButton, makeStyles, Link } from "@material-ui/core";
import { GitHub, LinkedIn, AccountCircle } from "@material-ui/icons";
import UserMenu from "./Menu";
import { useAuth } from "../../hooks/providers/Auth";

const useStyles = makeStyles({
  button: {
    margin: "0 20px",
    color: "#fff",
    borderColor: "#fff",
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
});
export default function IconButtonList(props) {
  const classes = useStyles();
  const { authState, toggleLoginWindow } = useAuth();

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      wrap="nowrap"
    >
      <Link href="https://github.com/zxw880507" target="_blank">
        <IconButton aria-label="github" className={classes.button}>
          <GitHub fontSize="large" />
        </IconButton>
      </Link>
      <Link
        href="https://www.linkedin.com/in/calvin-zheng-zxw880507/"
        target="_blank"
      >
        <IconButton aria-label="linkedin" className={classes.button}>
          <LinkedIn fontSize="large" />
        </IconButton>
      </Link>
      {authState.isAuth ? (
        <UserMenu {...props} />
      ) : (
        <Button
          variant="outlined"
          size="large"
          startIcon={<AccountCircle />}
          className={classes.button}
          onClick={toggleLoginWindow}
        >
          LOGIN
        </Button>
      )}
    </Grid>
  );
}
