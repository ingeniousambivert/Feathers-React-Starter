export const isAction =
  (...args) =>
  (hook) =>
    args.includes(hook.data.action);

export const skipHooks = (context) => {
  if (!context.params.provider) {
    return context;
  }
};
