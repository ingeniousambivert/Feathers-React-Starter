import { generateHTML } from "@/utils/templates/common.js";

const generateLink = (baseURL, type, hash) => {
  if (type === "signin") {
    return baseURL + "/signin";
  } else {
    if (type === "reset") type = "reset-password";
    return baseURL + "/" + type + "/?token=" + hash;
  }
};

export const buildNotifier = (app) => {
  return async (type, user) => {
    const mailer = app.helper("mailer").build(app);
    switch (type) {
      case "resendVerifySignup": {
        user.link = generateLink(app.get("client"), "verify", user.verifyToken);
        return mailer.send({
          to: user.email,
          subject: "Please verify your email",
          html: generateHTML.verify(user)
        });
      }

      case "verifySignup": {
        user.link = generateLink(app.get("client"), "signin");
        return mailer.send({
          to: user.email,
          subject: "Email verification successful",
          html: generateHTML.verifyDone(user)
        });
      }

      case "sendResetPwd": {
        user.link = generateLink(app.get("client"), "reset", user.resetToken);
        return mailer.send({
          to: user.email,
          subject: "Password reset request",
          html: generateHTML.reset(user)
        });
      }

      case "resetPwd": {
        user.link = generateLink(app.get("client"), "signin");
        return mailer.send({
          to: user.email,
          subject: "Password reset successful",
          html: generateHTML.resetDone(user)
        });
      }

      case "passwordChange": {
        user.link = generateLink(app.get("client"), "signin");
        return mailer.send({
          to: user.email,
          subject: "Password change successful",
          html: generateHTML.passwordChange(user)
        });
      }

      case "identityChange": {
        user.link = generateLink(app.get("client"), "verify", user.verifyToken);
        return mailer.send({
          to: user.email,
          subject: "Please verify your email",
          html: generateHTML.emailChange(user)
        });
      }

      default:
        return Promise.reject("Invalid Action");
    }
  };
};
