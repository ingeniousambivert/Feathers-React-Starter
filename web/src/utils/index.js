export {
  format as formatDate,
  formatISO as formatISODate,
  parse,
  parseISO,
  getDate,
  getDay,
  getMonth,
  getYear,
  startOfDay
} from "date-fns";

export const isObjectEmpty = (obj) => {
  for (let prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

export const formatCamelCase = (input) => {
  const words = input.split(/(?=[A-Z])/);
  const formattedString = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return formattedString;
};

export const sanitizeAndCapitalize = (string) => {
  if (typeof string === "string") {
    return string
      .replace(/_+/g, " ")
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  } else {
    return string;
  }
};

export const getUnique = (arr, comp) => {
  const unique = arr
    .map((e) => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((e) => typeof e === "number" && arr[e])
    .map((e) => typeof e === "number" && arr[e]);

  return unique;
};

export const sanitizeString = (string) => {
  return string.replace(/\s/g, "").toLowerCase();
};

export const capitalize = (string) => {
  if (typeof string === "string") {
    return string
      .trim()
      .toLowerCase()
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  } else {
    return string;
  }
};

export const filterOutArray = (filter, array) => {
  if (!Array.isArray(array)) {
    return array;
  } else {
    return array.filter((item) => item !== filter);
  }
};
