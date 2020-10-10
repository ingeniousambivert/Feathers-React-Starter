// Initializes the `notices` service on path `/notices`
const { Notices } = require("./notices.class");
const createModel = require("../../models/notices.model");
const hooks = require("./notices.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/notices", new Notices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("notices");

  service.hooks(hooks);
};
