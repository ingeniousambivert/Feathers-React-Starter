const { verifyEmail, emailVerified, sendResetPassword, resetPassword } = require("@utils/emailTemplates");

module.exports = function (app) {

	function getLink(type, hash) {
	const url = app.get("clientURL") + "/" + type + "?token=" + hash;
	return url;
	}

	function sendEmail(email) {
	return app
		.service("mailer")
		.create(email)
		.then((result) => {
		console.log("Sent email", result);
		})
		.catch((error) => {
		console.log("Error sending email", error);
		});
	}

	const FROM_EMAIL = app.get("fromEmail");
	const clientURL = app.get("clientURL");

	return {
	service: "users",
	notifier: function (type, user) {
		let tokenLink;
		let email;

		switch (type) {
		case "resendVerifySignup":
			console.log("user", user);
			tokenLink = getLink("verify", user.verifyToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Verify Email",
			html: verifyEmail(tokenLink),
			};
			return sendEmail(email);

		case "verifySignup":
			tokenLink = getLink("verify", user.verifyToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Successfully Verified Email",
			html: emailVerified(clientURL),
			};
			return sendEmail(email);

		case "sendResetPwd":
			console.log("user", user);
			tokenLink = getLink("reset-password", user.resetToken);
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Reset Password",
			html: sendResetPassword(tokenLink),
			};
			return sendEmail(email);

		case "resetPwd":
			tokenLink = getLink("reset-password", user.resetToken);
			email = email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Successfully Reset Password",
			html: resetPassword(clientURL),
			};
			return sendEmail(email);

		case "passwordChange":
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Password Changed",
			html: "<html><b>Successfully updated password. If this was not you, let us know.</b></html>",
			};
			return sendEmail(email);

		case "identityChange":
			tokenLink = getLink("verify", user.verifyToken);
			console.log("user", user);
			email = {
			from: FROM_EMAIL,
			to: [user.verifyChanges.email, user.email],
			subject: "Verify New Email Address",
			html: `<html><b>Verify New Email Address here ${tokenLink}</b></html>`,
			};
			return sendEmail(email);

		default:
			break;
		}
	},
	};
};
