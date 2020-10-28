// Initializes the `mailer` service on path `/mailer`
const hooks = require("./mailer.hooks");
const Mailer = require("feathers-mailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = function (app) {
	// Initialize our service with any options it requires

	//Gmail Service
	app.use("/mailer",Mailer(smtpTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service("mailer");
  service.hooks(hooks);
};
