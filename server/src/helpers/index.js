import mailer from "./mailer/mailer.helper.js";
import request from "./request/request.helper.js";

export default (app) => {
  // all the helpers will be registered to this object
  app.helpers = {};

  // support function get helpers by name with the same syntax as service.
  // app.service(<name>) -> app.helper(<name>)
  app.helper = (path) => app.helpers[path];

  // register all helpers
  app.configure(mailer);
  app.configure(request);
};
