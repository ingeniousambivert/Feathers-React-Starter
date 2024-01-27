import { feathers } from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors } from "@feathersjs/koa";
import socketio from "@feathersjs/socketio";
import morgan from "koa-morgan";
import { configurationValidator } from "./configuration.js";
import { logCritical } from "./hooks/app.hooks.js";
import { mongodb } from "./mongodb.js";
import { authentication } from "./authentication/index.js";
import { services } from "./services/index.js";
import { channels } from "./channels/index.js";
import integrations from "./integrations/index.js";
import helpers from "./helpers/index.js";
import automations from "./automations/index.js";
import { logger } from "./utils/logger.js";
import { notify } from "./utils/notifier.js";

const app = koa(feathers());
app.use(morgan("dev"));

// Attach logger
app.logger = logger;

// Attach webhook trigger
app.notify = notify;

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator));

// Set up Koa middleware
app.use(cors());
app.use(errorHandler());
app.use(parseAuthentication());
app.use(
  bodyParser({
    jsonLimit: "50mb"
  })
);

// Custom Service/Middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

// Configure services and transports
app.configure(rest());
app.configure(
  socketio({
    cors: {
      origin: app.get("origins")
    }
  })
);

app.configure(mongodb);

// Set up our service authentication (see `authentication/index.js`)
app.configure(authentication);

// Set up our helpers (see `helpers/index.js`)
app.configure(helpers);

// Set up our integrations (see `integrations/index.js`)
app.configure(integrations);

// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see `channels/index.js`)
app.configure(channels);

// Set up event automations (see` automations/index.js`)
app.configure(automations);

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logCritical]
  },
  before: {},
  after: {},
  error: {}
});
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
});

export { app };
