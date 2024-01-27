import { UserManagementService } from "./user-management.class.js";
import { authenticate, iff, isAction } from "@/hooks/index.js";
import { buildNotifier } from "./utils.js";

export const userManagementPath = "user-management";
export const userManagementMethods = ["create"];

// A configure function that registers the service and its hooks via `app.configure`
export const userManagement = (app) => {
  // Register our service on the Feathers application
  app.use(
    userManagementPath,
    new UserManagementService(app, {
      notifier: buildNotifier(app)
    }),
    {
      // A list of all methods this service exposes externally
      methods: userManagementMethods,
      // You can add additional custom events to be sent to clients here
      events: []
    }
  );
  // Initialize hooks
  app.service(userManagementPath).hooks({
    around: {
      all: []
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [iff(isAction("passwordChange", "identityChange"), authenticate("jwt"))],
      patch: [],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  });
};
