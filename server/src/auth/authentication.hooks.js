const { protect } = require("@feathersjs/authentication-local").hooks;

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [
			protect(
				"user.firstname",
				"user.lastname",
				"user.email",
				"user.isVerified",
				"user.active"
			),
		],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: [],
	},
};
