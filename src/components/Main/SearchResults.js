import { useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import { useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchResult } from "../../actions";
import SwiperItem from "./Swiper/SwiperItem";
import "../../styles/searchResult.css";

export default function SearchResults() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.searchResult);
  const { total_pages } = useSelector((state) => state.pages);
  const params = new URLSearchParams(location.search);
  const [keywords, page] = [
    params.get("keywords"),
    parseInt(params.get("page")),
  ];
  const handleChange = (event, value) => {
    if (value) {
      history.push(`${location.pathname}?keywords=${keywords}&page=${value}`);
    }
  };
  useEffect(() => {
    dispatch(fetchResult(keywords, page));
  }, [keywords, page, dispatch]);
  return (
    <>
      <div className="overflow-list-grid">
        {searchResult.map(
          (source, index) =>
            source.poster_path && <SwiperItem source={source} key={index} />
        )}
        <HiddenBox />
      </div>

      <Stack spacing={2} alignItems="center" style={{ marginBottom: "3rem" }}>
        {page <= total_pages && (
          <Pagination
            count={total_pages}
            page={page}
            color="primary"
            onChange={handleChange}
          />
        )}
      </Stack>
    </>
  );
}

function HiddenBox() {
  return (
    <>
      {[...new Array(12).keys()].map((el, index) => (
        <div key={index} className="overflow-item-container hidden"></div>
      ))}
    </>
  );
}
