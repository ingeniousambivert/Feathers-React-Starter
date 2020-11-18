const { protect, } = require("@hooks");

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [// prevent leak of these user information fields
			protect(
				"password",
				"active",
				"firstname",
				"lastname",
				"email",
				"permissions",
				"verifyToken",
				"updatedAt",
				"createdAt",
				"verifyShortToken",
				"verifyExpires",
				"resetToken",
				"resetExpires",
				"verifyChanges",
				"__v"
			),],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
