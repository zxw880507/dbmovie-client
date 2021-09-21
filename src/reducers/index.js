import { combineReducers } from "redux";
import * as all from "./searchReducer";

export const allReducers = combineReducers({
  searchKeywords: all.searchKeywordsReducer,
  searchResult: all.searchResultReducer,
  pages: all.pageReducer,
});
