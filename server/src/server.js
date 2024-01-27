import util from "util";
import { app } from "./app.js";

const port = app.get("port");
const host = app.get("host");

process.on("unhandledRejection", (reason, promise) => {
  app.logger.error(
    `server: unhandled rejection at: ${util.inspect(promise)} reason: ${util.inspect(reason)}`
  );
  app.notify.error(
    `server: unhandled rejection at: ${util.inspect(promise)} reason: ${util.inspect(reason)}`
  );
});

process.on("uncaughtException", (error) => {
  app.logger.error(`server: uncaught exception: ${util.inspect(error)}`);
  app.notify.error(`server: uncaught exception: ${util.inspect(error)}`);
});

app.listen(port).then(() => {
  app.logger.info(`Started server: ${String(process.env.NODE_ENV).toUpperCase()}`);
  app.logger.info(`${String(process.env.NODE_ENV).toUpperCase()} server listening on ${host}:${port}`);
});
