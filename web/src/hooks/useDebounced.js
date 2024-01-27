import React from "react";

export function useDebouncedValue(value, delay = 1000) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebouncedFunction(callback, delay = 1000) {
  const [debouncedCallback, setDebouncedCallback] = React.useState(() => () => {});

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCallback(() => callback);
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay]);

  return debouncedCallback;
}
