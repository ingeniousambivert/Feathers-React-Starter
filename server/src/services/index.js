const users = require("./users/users.service.js");

const projects = require("./projects/projects.service.js");

const usermanagement = require("./usermanagement/usermanagement.service.js");

const notices = require("./notices/notices.service.js");

module.exports = function (app) {
  app.configure(users);
  app.configure(projects);
  app.configure(usermanagement);
  app.configure(notices);
};
