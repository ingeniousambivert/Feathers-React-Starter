// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication";
import { LocalStrategy } from "@feathersjs/authentication-local";
import { iff, isProvider, discard } from "@/hooks/index.js";

export const authentication = (app) => {
  const authenticationPath = "authentication";
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use(authenticationPath, authentication);
  // Initialize hooks
  app.service(authenticationPath).hooks({
    around: {},
    before: {},
    after: {
      all: iff(
        isProvider("external"),
        discard(
          "user.password",
          "user.verifyToken",
          "user.verifyShortToken",
          "user.verifyExpires",
          "user.resetToken",
          "user.resetExpires",
          "user.resetAttempts",
          "user.resetShortToken",
          "user.verifyChanges"
        )
      )
    },
    error: {}
  });
};
