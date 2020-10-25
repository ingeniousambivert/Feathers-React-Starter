const {
	authenticate, hashPassword,protect, disallow,
	iff, isProvider, preventChanges,
	addVerification, removeVerification
	} = require("@hooks");
const accountService = require("@services/authmanagement/notifier");

const accountServiceHook = (context) => {
	accountService(context.app).notifier("resendVerifySignup", context.result);
};

module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [hashPassword("password"),addVerification()],
    update: [disallow("external")],
    patch: [hashPassword("password"), authenticate("jwt"), iff(
			isProvider("external"),
			preventChanges(true,
				"email",
				"isVerified",
				"verifyToken",
				"verifyShortToken",
				"verifyExpires",
				"verifyChanges",
				"resetToken",
				"resetShortToken",
				"resetExpires"
			))],
    remove: [authenticate("jwt")]
  },

  after: {
    all: [protect("password")],
    find: [],
    get: [],
		create: [
		protect("firstname",
		"lastname",
		"email",
		"isVerified",
		"verifyToken",
		"verifyShortToken",
		"verifyExpires",
		"verifyChanges",
		"resetToken",
		"resetShortToken",
		"resetExpires",
		"active"),
		accountServiceHook,
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
