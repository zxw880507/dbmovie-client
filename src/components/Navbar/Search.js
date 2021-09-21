import React from "react";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, alpha } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setKeywords, resetKeywords } from "../../actions";

const useStyles = makeStyles((theme) => ({
  search: {
    alignSelf: "center",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    color: "rgb(1, 180, 228)",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
export default function Search(props) {
  const { url } = props;
  const classes = useStyles();
  const history = useHistory();
  const searchKeywords = useSelector((state) => state.searchKeywords);

  const dispatch = useDispatch();
  const setInput = (e) => {
    dispatch(setKeywords(e.target.value));
  };
  const searchOnSubmit = (e) => {
    e.preventDefault();
    history.push(`${url}/search?keywords=${searchKeywords}&page=1`);
    dispatch(resetKeywords());
  };

  return (
    <div className={classes.search}>
      <form onSubmit={searchOnSubmit}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={searchKeywords}
          onChange={setInput}
        />
      </form>
    </div>
  );
}
