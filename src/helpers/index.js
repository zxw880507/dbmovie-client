export function getTags(tab) {
  const { type, keyword, sortByType } = tab;
  const tags = (sortByType ? type : keyword).map((el) =>
    el.toLowerCase().replace(/\s/g, "_")
  );
  return { ...tab, tags };
}

export function tagFormatting(tag) {
  if (tag === "tv") {
    return tag.toUpperCase();
  }

  return tag
    .replace(/\w+/g, (x) => x[0].toUpperCase() + x.slice(1))
    .replace(/_/g, " ");
}

export function shuffle(data, num) {
  let random = data
    .map((el) => ({ el, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ el }) => el);

  return random.slice(0, num);
}

export function dropMedium(list, source) {
  const listCopy = [...list];
  const index = list.findIndex((el) => el.id === source.id);
  listCopy.splice(index, 1);
  return listCopy;
}

export function getUsername(email) {
  return email.match(/.+(?=@.+)/g).join("");
}

export function replaceUnderscore(str) {
  return str.replace(/_/g, " ");
}

export function filterMedia(list, filters) {
  const listCopy = [...list];
  const { media_type, sort_by, order } = filters;
  const filter = listCopy.filter((source) => {
    switch (media_type) {
      case "movie":
        return source.title;
      case "TV":
        return source.name;
      default:
        return true;
    }
  });
  const sortBy = filter.sort((a, b) => {
    switch (sort_by) {
      case "name": {
        let _a = a.title || a.name;
        let _b = b.title || b.name;
        if (order === "asc") {
          return _a > _b ? 1 : -1;
        }
        return _a < _b ? 1 : -1;
      }

      case "release_date": {
        let _a = a.release_date || a.first_air_date;
        let _b = b.release_date || b.first_air_date;
        if (order === "asc") {
          return _a > _b ? 1 : -1;
        }
        return _a < _b ? 1 : -1;
      }
      default:
        return true;
    }
  });
  return sortBy;
}
