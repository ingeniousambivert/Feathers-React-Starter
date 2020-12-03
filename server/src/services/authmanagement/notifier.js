const { emailTemplate } = require("@utils/emailTemplate");

module.exports = function (app) {

	const FROM_EMAIL = app.get("fromEmail");
	const clientURL = app.get("clientURL");
	let content ="";

	function getLink(type, hash) {
	return clientURL + "/" + type + "?token=" + hash;
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

	return {
	service: "users",
	notifier: function (type, user) {
		let tokenLink;
		let email;

		switch (type) {
		case "resendVerifySignup":
			console.log("user", user);
			tokenLink = getLink("verify", user.verifyToken);
			content = `Welcome to <b>Feathers-React Starter</b>.Please verify your email to access all the features. <br/>
			<a target="_blank" href="${tokenLink}">Click here to verify</a>.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${tokenLink}">${tokenLink}</a>`;
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Verify Email Address",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		case "verifySignup":
			content = `You have successfully verified your email. Thank you for signing up.<br/>
			<a target="_blank" href="${clientURL}/signin">Sign In</a> to access all the features.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${clientURL}/signin">${clientURL}/signin</a>`;
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Email Verification Successful",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		case "sendResetPwd":
			console.log("user", user);
			tokenLink = getLink("reset-password", user.resetToken);
			content = `You have requested to reset your password.<br/> Please
			<a target="_blank" href="${tokenLink}">click here</a> to visit the password reset page.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${tokenLink}">${tokenLink}</a> <br/>
			If you did not request a password reset please ignore this email.`;
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Reset Password",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		case "resetPwd":
			content = `You have successfully reset your password.<br/>
			<a target="_blank" href="${clientURL}/signin">Sign In</a> to access your account with the new password.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${clientURL}/signin">${clientURL}/signin</a>`;
			email = email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Password Reset Successful",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		case "passwordChange":
			content = `You have updated your password. If this was not you. Let us know. <br/>
			<a target="_blank" href="${clientURL}/signin">Sign In</a> to access your account with the new password.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${clientURL}/signin">${clientURL}/signin</a>`;
			email = {
			from: FROM_EMAIL,
			to: user.email,
			subject: "Password Update Successful",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		case "identityChange":
			console.log("user", user);
			tokenLink = getLink("verify", user.verifyToken);
			content = `You have updated your email.<br/> Please
			<a target="_blank" href="${tokenLink}">click here</a> to verify the new email.<br/>
			If you are not automatically redirected please manually visit the link : <br/>
			<a target="_blank" href="${tokenLink}">${tokenLink}</a> <br/>`;
			email = {
			from: FROM_EMAIL,
			to: [user.verifyChanges.email, user.email],
			subject: "Verify New Email Address",
			html: emailTemplate(content),
			};
			return sendEmail(email);

		default:
			break;
		}
	},
	};
};
