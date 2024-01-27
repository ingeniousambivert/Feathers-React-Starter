// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import {
  authenticate,
  addVerification,
  removeVerification,
  disallow,
  iff,
  preventChanges,
  isProvider
} from "@/hooks/index.js";
import { hooks as schemaHooks } from "@feathersjs/schema";
import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from "./users.schema.js";
import { UserService, getOptions } from "./users.class.js";
import { buildNotifier } from "@/services/user-management/utils.js";

export const userPath = "users";
export const userMethods = ["find", "get", "create", "patch", "remove"];

export * from "./users.class.js";
export * from "./users.schema.js";

const sendVerify = () => {
  return async (context) => {
    const notifier = buildNotifier(context.app);
    await notifier("resendVerifySignup", context.result);
  };
};

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(userExternalResolver), schemaHooks.resolveResult(userResolver)],
      find: [authenticate("jwt")],
      get: [authenticate("jwt")],
      create: [],
      update: [disallow("external"), authenticate("jwt")],
      patch: [authenticate("jwt")],
      remove: [authenticate("jwt")]
    },
    before: {
      all: [schemaHooks.validateQuery(userQueryValidator), schemaHooks.resolveQuery(userQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
        addVerification("user-management")
      ],
      patch: [
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver),
        iff(
          isProvider("external"),
          preventChanges(
            true,
            "email",
            "password",
            "role",
            "isVerified",
            "verifyToken",
            "verifyShortToken",
            "verifyExpires",
            "verifyChanges",
            "resetToken",
            "resetShortToken",
            "resetExpires"
          )
        )
      ],
      remove: []
    },
    after: {
      all: [],
      create: [sendVerify(), removeVerification()]
    },
    error: {
      all: []
    }
  });
};
