import { storage } from "./storage/storage.js";
import { userManagement } from "./user-management/user-management.js";
import { user } from "./users/users.js";

export const services = (app) => {
  // All services will be registered here
  app.configure(storage);
  app.configure(userManagement);
  app.configure(user);
};
