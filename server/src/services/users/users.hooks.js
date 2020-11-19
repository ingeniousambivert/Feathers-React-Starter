const { authenticate, hashPassword,protect, disallow,
	iff, isProvider, preventChanges,
	addVerification, removeVerification } = require("@hooks");

const notifyService = require("@services/authmanagement/notifier");

const notifyServiceHook = (context) => {
	notifyService(context.app).notifier("resendVerifySignup", context.data);
};

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password"),addVerification(),],
    update: [disallow("external")],
    patch: [hashPassword("password"), authenticate("jwt"), iff(
			isProvider("external"),
			preventChanges(
				true,
				"email",
				"isVerified",
				"verifyToken",
				"verifyShortToken",
				"verifyExpires",
				"verifyChanges",
				"resetToken",
				"resetShortToken",
				"resetExpires"
			),)],
    remove: [authenticate("jwt"),disallow("external")]
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
		),],
    find: [],
    get: [],
	create: [
		protect(
			"active",
			"firstname",
			"lastname",
			"email",
			"permissions",
		),
		// after a user is created, send the user an email to verify email
		notifyServiceHook,
		// remove the user verification fields before returning user as part of request
		removeVerification()],
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
