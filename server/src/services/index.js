const users = require("./users/users.service.js");
const usermanagement = require("./usermanagement/usermanagement.service.js");

module.exports = function (app) {
  app.configure(users);
  app.configure(usermanagement);
};
