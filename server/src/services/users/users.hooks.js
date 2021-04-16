const {
	authenticate,
	hashPassword,
	protect,
	disallow,
	iff,
	isProvider,
	preventChanges,
	setField,
	checkPermissions,
	addVerification,
	removeVerification,
} = require("@hooks");

const notifyService = require("@services/authmanagement/notifier");

const notifyServiceHook = (context) => {
	notifyService(context.app).notifier("resendVerifySignup", context.data);
};

module.exports = {
	before: {
		all: [],
		find: [authenticate("jwt")],
		get: [authenticate("jwt")],
		create: [hashPassword("password"), addVerification()],
		update: [
			authenticate("jwt"),
			iff(
				isProvider("external"),
				preventChanges(
					true,
					"verifyToken",
					"verifyShortToken",
					"verifyExpires",
					"verifyChanges",
					"resetToken",
					"resetShortToken",
					"resetExpires"
				),
				iff(
					checkPermissions({
						roles: ["super_admin", "admin"],
						field: "permissions",
						error: false,
					})
				),
				iff((context) => !context.params.permitted, [
					setField({
						from: "params.user._id",
						as: "params.query._id",
					}),
				]),
				hashPassword("password")
			),
		],
		patch: [
			authenticate("jwt"),
			iff(
				isProvider("external"),
				preventChanges(
					true,
					"verifyToken",
					"verifyShortToken",
					"verifyExpires",
					"verifyChanges",
					"resetToken",
					"resetShortToken",
					"resetExpires"
				),
				iff(
					checkPermissions({
						roles: ["super_admin", "admin"],
						field: "permissions",
						error: false,
					})
				),
				iff((context) => !context.params.permitted, [
					setField({
						from: "params.user._id",
						as: "params.query._id",
					}),
				]),
				hashPassword("password")
			),
		],
		remove: [authenticate("jwt"), disallow("external")],
	},

	after: {
		all: [
			protect(
				"password",
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
		create: [
			protect("active", "firstname", "lastname", "email", "permissions"),
			notifyServiceHook,
			removeVerification(),
		],
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
