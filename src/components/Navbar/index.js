import React from "react";
import {
  AppBar,
  Container,
  Slide,
  makeStyles,
  useScrollTrigger,
} from "@material-ui/core";
import BarContent from "./BarContent";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(13, 37, 63)",
  },
});
export default function HideOnScroll() {
  const classes = useStyles();
  const trigger = useScrollTrigger();
  return (
    <Slide in={!trigger}>
      <AppBar className={classes.container}>
        <Container maxWidth="lg">
          <BarContent />
        </Container>
      </AppBar>
    </Slide>
  );
}
