import React from "react";

import { Grid } from "@material-ui/core";
import Swiper from "./Swiper";
import { getTags } from "../../helpers";
const tabs = [
  {
    title: "What's Popular",
    type: ["Movie", "TV"],
    keyword: "popular",
    sortByType: true,
  },
  {
    title: "Explore Movies",
    type: "movie",
    keyword: ["Now Playing", "Top Rated", "Upcoming"],
    sortByType: false,
  },
  {
    title: "What's On TV",
    type: "tv",
    keyword: ["On The Air", "Top Rated"],
    sortByType: false,
  },
];
export default function SwpiperList() {
  return (
    <Grid
      container
      style={{ margin: "2em 0" }}
      direction="column"
      justifyContent="space-evenly"
      alignItems="center"
    >
      {tabs.map((tab, index) => (
        <Swiper key={index} tab={getTags(tab)} />
      ))}
    </Grid>
  );
}
