// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from "@feathersjs/schema";
import { ObjectIdSchema } from "@feathersjs/schema";
import { passwordHash } from "@feathersjs/authentication-local";
import { dataValidator, queryValidator } from "@/validators.js";

// Main data model schema
export const userSchema = {
  $id: "User",
  type: "object",
  additionalProperties: false,
  required: ["firstname", "lastname", "email", "password"],
  properties: {
    _id: ObjectIdSchema(),
    firstname: { type: "string" },
    lastname: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    isActive: { type: "boolean", default: true },
    archived: { type: "boolean", default: false },
    role: { type: "string", default: "user" },
    isVerified: { type: "boolean", nullable: true },
    verifyToken: { type: "string", nullable: true },
    verifyShortToken: { type: "string", nullable: true },
    verifyChanges: { type: ["string", "array", "object"], nullable: true },
    verifyExpires: { type: ["string", "number"], format: "date-time", nullable: true },
    resetToken: { type: "string", nullable: true },
    resetShortToken: { type: "string", nullable: true },
    resetAttempts: { type: "number", nullable: true },
    resetExpires: { type: ["string", "number"], format: "date-time", nullable: true },
    config: { type: "object" },
    metadata: { type: "object" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" }
  }
};
export const userValidator = getValidator(userSchema, dataValidator);
export const userResolver = resolve({});

export const userExternalResolver = resolve({
  // The password should never be visible externally
  password: async () => undefined
});

// Schema for creating new data
export const userDataSchema = {
  $id: "UserData",
  type: "object",
  additionalProperties: false,
  required: ["firstname", "lastname", "email", "password"],
  properties: {
    ...userSchema.properties,
    createdAt: { type: "string", format: "date-time", default: new Date() }
  }
};
export const userDataValidator = getValidator(userDataSchema, dataValidator);
export const userDataResolver = resolve({
  password: passwordHash({ strategy: "local" })
});

// Schema for updating existing data
export const userPatchSchema = {
  $id: "UserPatch",
  type: "object",
  additionalProperties: false,
  required: [],
  properties: {
    ...userSchema.properties,
    updatedAt: { type: "string", format: "date-time", default: new Date() }
  }
};
export const userPatchValidator = getValidator(userPatchSchema, dataValidator);
export const userPatchResolver = resolve({});

// Schema for allowed query properties
export const userQuerySchema = {
  $id: "UserQuery",
  type: "object",
  additionalProperties: false,
  properties: {
    ...querySyntax(userSchema.properties)
  }
};
export const userQueryValidator = getValidator(userQuerySchema, queryValidator);
export const userQueryResolver = resolve({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id;
    }

    return value;
  }
});
