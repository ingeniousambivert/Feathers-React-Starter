const {required, disallow, iff, isProvider, preventChanges} = require("feathers-hooks-common");

  const {authenticate} = require("@feathersjs/authentication").hooks;

  const {protect, hashPassword} = require("@feathersjs/authentication-local").hooks;

  const verifyHooks = require("feathers-authentication-management").hooks;



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
  };
