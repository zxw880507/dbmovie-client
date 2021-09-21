import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { shuffle } from "../../helpers";

const useStyles = makeStyles({
  shadeCover: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  innerContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    width: "70%",
    height: "90%",
    margin: "0 auto",
    minWidth: 750,
    minHeight: 400,
  },
  poster: {
    height: "80%",
    borderRadius: 10,
    boxShadow: "1px 1px 10px rgba(0,0,0,1)",
  },
  detailBox: {
    height: "80%",
    paddingLeft: 30,
    color: "#fff",
    fontFamily: "Source Sans Pro', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    textShadow: "1px 1px 10px rgba(255,255,255, .2)",
  },
  detailHeadingBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  detailOverviewBox: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
});
export default function Header() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`/api/trending/movie/week`).then((res) => {
      const newData = shuffle([...res.data.results], 8);
      setData(newData);
    });
  }, []);
  return (
    <Carousel fade>
      {data &&
        data.map((movie, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
              alt={`${movie.title}_background`}
            />
            <div className={classes.shadeCover}>
              <div className={classes.innerContainer}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title}_poster`}
                  className={classes.poster}
                />
                <div className={classes.detailBox}>
                  <div className={classes.detailHeadingBox}>
                    <h1 style={{ fontWeight: "500", fontSize: "2em" }}>
                      {movie.title}
                      <span style={{ opacity: 0.8 }}>
                        {" "}
                        ({movie.release_date.slice(0, 4)})
                      </span>
                    </h1>
                    <p>
                      <span>{movie.release_date}</span> ・{" "}
                      <span>Action, Science Fiction</span>
                    </p>
                  </div>
                  <div className={classes.detailOverviewBox}>
                    <h4>Overview</h4>
                    <p style={{ textAlign: "justify" }}>{movie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}
