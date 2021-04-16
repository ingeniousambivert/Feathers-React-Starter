const { authenticate, protect, iff } = require("@hooks");

const isAction = (...args) => (hook) => args.includes(hook.data.action);

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [
			iff(isAction("passwordChange", "identityChange"), authenticate("jwt")),
		],
		update: [],
		patch: [],
		remove: [],
	},

	after: {
		all: [
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
