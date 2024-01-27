const nativeExceptions = [EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError];

function throwNative(error) {
  if (nativeExceptions.some((Exception) => error instanceof Exception)) {
    throw error;
  }
}

async function safety(promise, finalFunction) {
  try {
    const data = await promise;
    if (data instanceof Error) {
      throwNative(data);
      return { data: null, error: data };
    }
    return { data, error: null };
  } catch (error) {
    throwNative(error);
    return { data: null, error };
  } finally {
    finalFunction?.();
  }
}

export { safety };
