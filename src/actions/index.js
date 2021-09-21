import axios from "axios";
export const setKeywords = (input) => {
  return { type: "SET_KEYWORDS", payload: input };
};

export const resetKeywords = () => {
  return { type: "RESET_KEYWORDS" };
};

export const setResult = (results) => {
  return { type: "SET_RESULT", payload: results };
};

export const setPages = (total_pages, page) => {
  return {
    type: "SET_PAGES",
    payload: {
      total_pages,
      page,
    },
  };
};
export const fetchResult = (keywords, page) => (dispatch, getState) => {
  axios.get(`/api/search`, { params: { keywords, page } }).then((res) => {
    const { page, results, total_pages } = res.data;
    dispatch(setResult(results));
    dispatch(setPages(total_pages, page));
  });
};
