import { FeathersError } from "@feathersjs/errors";

class Conflict extends FeathersError {
  constructor(message) {
    super(message, "conflict", 409, "Conflict");
  }
}

class Forbidden extends FeathersError {
  constructor(message) {
    super(message, "forbidden", 403, "Forbidden");
  }
}

class BadRequest extends FeathersError {
  constructor(message) {
    super(message, "bad-request", 400, "BadRequest");
  }
}

class NotFound extends FeathersError {
  constructor(message) {
    super(message, "not-found", 404, "NotFound");
  }
}

class NotImplemented extends FeathersError {
  constructor(message) {
    super(message, "not-implemented", 501, "NotImplemented");
  }
}

class NotAuthenticated extends FeathersError {
  constructor(message) {
    super(message, "not-authenticated", 401, "NotAuthenticated");
  }
}

class NotAuthorized extends FeathersError {
  constructor(message) {
    super("You are not authorized to do this", "not-authorized", 403, "NotAuthorized");
  }
}

class TooManyRequests extends FeathersError {
  constructor(message) {
    super(message, "too-many-requests", 429, "TooManyRequests");
  }
}

class ServerError extends FeathersError {
  constructor(message, data) {
    super(message, "internal-server-error", 500, "InternalServerError", data);
  }
}

export {
  Conflict,
  Forbidden,
  BadRequest,
  NotFound,
  NotImplemented,
  NotAuthenticated,
  NotAuthorized,
  TooManyRequests,
  ServerError
};
