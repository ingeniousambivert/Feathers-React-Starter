// Initializes the `usermanagement` service on path `/usermanagement`
const { Usermanagement } = require("./usermanagement.class");
const hooks = require("./usermanagement.hooks");

module.exports = function (app) {
  const options = {
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/usermanagement", new Usermanagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("usermanagement");

  service.hooks(hooks);
};
