import { useState, useEffect } from "react";
import axios from "axios";

export default function useSwiper(tab) {
  const init = tab.tags.reduce((a, b) => ({ ...a, [b]: null }), {});
  const [state, setState] = useState(init);
  const [selectedTag, setSelectTag] = useState(tab.tags[0]);
  const [data, setData] = useState(undefined);
  const onChange = (tag) => {
    setSelectTag(tag);
  };
  useEffect(() => {
   
    const { type, keyword, sortByType, tags } = tab;
    const promiseArr = tags.map((tag) => {
      const url = sortByType ? `${tag}/${keyword}` : `${type}/${tag}`;
      return axios
        .get(`/api/${url}`)
        .then((res) => ({ [tag]: res.data.results }));
    });
    Promise.all(promiseArr).then((res) => {
      const newState = res.reduce((a, b) => ({ ...a, ...b }));
      setState((prev) => ({ ...prev, ...newState }));
    });
  }, [tab]);

  useEffect(() => {
    setData(state[selectedTag]);
  }, [selectedTag, state]);

  return { selectedTag, data, onChange };
}
