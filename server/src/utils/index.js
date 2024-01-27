import { nanoid } from "nanoid";
export { format, parse, formatISO, parseISO, getDate, getDay, getMonth, getYear, startOfDay } from "date-fns";

export function deduplicateArray(input, inclusiveKeys, exclusiveKeys = []) {
  if (!Array.isArray(input) || !Array.isArray(inclusiveKeys) || !Array.isArray(exclusiveKeys)) {
    throw new Error("input, inclusiveKeys, exclusiveKeys should be of data type array");
  }
  const mergeObjects = (primaryObj, secondaryObj) => {
    for (const key in secondaryObj) {
      if (secondaryObj.hasOwnProperty(key)) {
        if (Array.isArray(secondaryObj[key])) {
          if (typeof secondaryObj[key][0] === "object") {
            const mergedArray = [...(primaryObj[key] || []), ...secondaryObj[key]];
            const uniqueArray = [];
            const uniqueSet = new Set();
            for (const item of mergedArray) {
              const itemString = JSON.stringify(item);
              if (!uniqueSet.has(itemString)) {
                uniqueSet.add(itemString);
                uniqueArray.push(item);
              }
            }
            primaryObj[key] = uniqueArray;
          } else {
            primaryObj[key] = [...new Set([...(primaryObj[key] || []), ...secondaryObj[key]])];
          }
        } else if (typeof secondaryObj[key] === "object" && secondaryObj[key] !== null) {
          primaryObj[key] = mergeObjects(primaryObj[key] || {}, secondaryObj[key]);
        } else {
          primaryObj[key] = secondaryObj[key];
        }
      }
    }
    return primaryObj;
  };
  const inputArray = JSON.parse(JSON.stringify(input));
  const keysToDeduplicate = JSON.parse(JSON.stringify(inclusiveKeys));
  const keysToIgnore = JSON.parse(JSON.stringify(exclusiveKeys));
  const uniqueKeyCombinations = new Map();
  const deduplicatedArray = [];

  for (const item of inputArray) {
    const keyCombination = keysToDeduplicate
      .filter((key) => !keysToIgnore.includes(key))
      .map((key) => {
        let value = item;
        const nestedKeys = key.split(".");
        for (const nestedKey of nestedKeys) {
          value = value[nestedKey];
        }
        return value;
      })
      .join("|");

    if (!uniqueKeyCombinations.has(keyCombination)) {
      uniqueKeyCombinations.set(keyCombination, item);
      deduplicatedArray.push(item);
    } else {
      const existingItem = uniqueKeyCombinations.get(keyCombination);
      mergeObjects(existingItem, item);
    }
  }
  return deduplicatedArray;
}

export function getFunctionFileInfo(func) {
  try {
    const error = new Error();
    const stackLines = error.stack.split("\n");
    const callingLine = stackLines.find((line) => line.includes(func.name));
    const fileInfoMatch = callingLine.match(/\((.*):([0-9]+):[0-9]+\)/);
    return fileInfoMatch ? `${fileInfoMatch[1]}:${fileInfoMatch[2]}` : "Unknown file info";
  } catch (error) {
    return "Unknown file info";
  }
}

export function isArrayofObjects(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "object" || arr[i] === null || Array.isArray(arr[i])) {
      return false;
    }
  }
  return true;
}

export function dataUriToUint8Array(dataUri) {
  const base64Data = dataUri.split(",")[1];
  const uint8Array = Buffer.from(base64Data, "base64");
  return uint8Array;
}

export function isImageDataUri(uri) {
  const dataUriRegex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9.-]+)?(;base64)?,([a-zA-Z0-9!#$&-;=._~%\s]*)(#.*)?$/;
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];
  if (!dataUriRegex.test(uri)) {
    return false;
  }
  const matches = uri.match(dataUriRegex);
  const mimeType = matches[1];
  return allowedMimeTypes.includes(mimeType);
}

export function cloneDeep(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let clone = Array.isArray(obj) ? [] : {};

  for (let i in obj) {
    if (obj[i] && typeof obj[i] == "object") {
      clone[i] = cloneDeep(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }

  return clone;
}

export async function processBatchArray({
  dataArray,
  batchSize,
  key,
  search,
  operator,
  callBack = (item) => {}
}) {
  const comparisons = {
    "===": (a, b) => a === b,
    "==": (a, b) => a == b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b
  };

  if (!comparisons[operator]) {
    throw new Error(`Unsupported operator: ${operator}`);
  }

  const processedArray = [];

  for (let currentIndex = 0; currentIndex < dataArray.length; currentIndex += batchSize) {
    const batch = dataArray.slice(currentIndex, currentIndex + batchSize);

    for (const currentItem of batch) {
      if (comparisons[operator](currentItem[key], search)) {
        processedArray.push(currentItem);
        await callBack(currentItem);
      }
    }
  }

  return processedArray;
}

export function flattenArray(nestedArray) {
  let flatArray = [];
  if (Array.isArray(nestedArray)) {
    for (let i = 0; i < nestedArray.length; i++) {
      if (Array.isArray(nestedArray[i])) {
        if (nestedArray[i].length > 0) {
          flatArray = flatArray.concat(flattenArray(nestedArray[i]));
        }
      } else {
        flatArray.push(nestedArray[i]);
      }
    }
  }
  return flatArray;
}

export const injectId = (data) => {
  if (Array.isArray(data) && data.length > 0) {
    const injected = data.map((item) => {
      item.id = nanoid();
      return item;
    });
    return injected;
  } else {
    return [];
  }
};

export const generateId = nanoid;

export function createTimestamp() {
  const now = new Date();

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  };

  const formatter = new Intl.DateTimeFormat("en-GB", options);
  const timestamp = formatter.format(now).replace(/\s/g, "");
  const [datePart, timePart] = timestamp.split(",");
  return { datePart, timePart, timestamp };
}
