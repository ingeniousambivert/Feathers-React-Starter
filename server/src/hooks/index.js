const {required, disallow, iff, isProvider, preventChanges} = require("feathers-hooks-common");

  const {authenticate} = require("@feathersjs/authentication").hooks;

  const {protect, hashPassword} = require("@feathersjs/authentication-local").hooks;

const verifyHooks = require("feathers-authentication-management").hooks;

const patchUserEmail = async (context) => {

	const userID = context.params.user._id;
	const changedEmail = context.data.value.changes.email;
	await context.app.service("users")._patch(userID, {
		isVerified: false,
		email:changedEmail,
	});
	return context.dispatch;
};



  module.exports = {
	// feathers-hooks-common
	required,
	disallow,
	iff,
	isProvider,
	preventChanges,

	//feathersjs/authentication
	authenticate,

	// feathers-authentication-local
	protect,
	hashPassword,

	// feathers-authentication-management
	addVerification: verifyHooks.addVerification,
	removeVerification: verifyHooks.removeVerification,

	// local hooks
	patchUserEmail
  };
