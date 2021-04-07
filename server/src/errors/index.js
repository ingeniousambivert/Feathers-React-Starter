/* eslint-disable no-undef */
const errors = require("feathers-errors");

const userNotFound = new errors.NotFound("User does not exist");
const invalidEmail = new errors.BadRequest("Invalid email");
const emailTaken = new errors.BadRequest("Email already taken");
const notAuthenticated = new errors.NotAuthenticated(
	"You are not authenticated"
);

const errorHandler = (context) => {
	if (context.error) {
		const error = context.error;
		if (!error.code) {
			const newError = new errors.GeneralError("Server Error");
			context.error = newError;
			return context;
		}
		if (error.code === 404 || process.env.NODE_ENV === "production") {
			error.stack = null;
		}
		return context;
	}
};

module.exports = {
	userNotFound,
	invalidEmail,
	emailTaken,
	notAuthenticated,
	errorHandler,
};
