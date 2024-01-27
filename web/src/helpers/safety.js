const nativeExceptions = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError].filter(
  (except) => typeof except === "function"
);

function throwNative(error) {
  for (const Exception of nativeExceptions) {
    if (error instanceof Exception) throw error;
  }
}

function safety(promise, finalFunction) {
  return promise
    .then((data) => {
      if (data instanceof Error) {
        throwNative(data);
        return { data: null, error: data };
      }
      return { data, error: null };
    })
    .catch((error) => {
      throwNative(error);
      return { data: null, error };
    })
    .finally(() => {
      if (finalFunction && typeof finalFunction === "function") {
        finalFunction();
      }
    });
}

export default safety;
