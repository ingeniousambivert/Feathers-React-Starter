import { defaultAppSettings, getValidator } from "@feathersjs/schema";

import { dataValidator } from "./validators.js";

export const configurationSchema = {
  $id: "configuration",
  type: "object",
  additionalProperties: true,
  required: ["host", "port"],
  properties: {
    ...defaultAppSettings,
    host: { type: "string" },
    port: { type: "number" }
  }
};

export const configurationValidator = getValidator(configurationSchema, dataValidator);
