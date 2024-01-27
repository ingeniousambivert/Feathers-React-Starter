import { keywordObjectId } from "@feathersjs/mongodb";

// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from "@feathersjs/schema";

const formats = [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex"
];

export const dataValidator = addFormats(new Ajv({ useDefaults: true, allowUnionTypes: true }), formats);

export const queryValidator = addFormats(
  new Ajv({
    coerceTypes: true,
    allowUnionTypes: true
  }),
  formats
);

dataValidator.addKeyword(keywordObjectId);
queryValidator.addKeyword(keywordObjectId);
