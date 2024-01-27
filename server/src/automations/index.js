export default (app) => {
  // All the automations will be registered to this object
  app.automations = {};

  // Support function to get automations by name with the same syntax as service.
  // app.service(<name>) -> app.automations(<name>)
  app.automation = (path) => app.automations[path];

  // Register all automations
};
