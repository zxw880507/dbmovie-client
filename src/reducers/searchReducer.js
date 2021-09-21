export const searchKeywordsReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_KEYWORDS":
      return action.payload;
    case "RESET_KEYWORDS":
      return "";
    default:
      return state;
  }
};

export const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULT":
      return [...action.payload];
    default:
      return state;
  }
};

export const pageReducer = (state = { total_pages: 1, page: 1 }, action) => {
  switch (action.type) {
    case "SET_PAGES":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
