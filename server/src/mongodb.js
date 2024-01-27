import { MongoClient } from "mongodb";

export const mongodb = (app, retryCount = 0) => {
  const maxRetries = 10;
  const initialDelay = 1000;
  const maxDelay = 10000;
  const connection = app.get("mongodb");
  const database = new URL(connection).pathname.substring(1);
  const mongoClient = MongoClient.connect(connection)
    .then((client) => client.db(database))
    .catch((error) => {
      if (retryCount < maxRetries) {
        const delay = Math.min(initialDelay * Math.pow(2, retryCount), maxDelay);
        const newCount = retryCount + 1;
        app.logger.info(`mongodb: Retrying connection in ${delay / 1000} second/s. Retry count: ${newCount}`);
        setTimeout(() => {
          mongodb(app, newCount);
        }, delay);
      } else {
        app.logger.error(
          `mongodb: Max retries reached. Unable to connect to MongoDB - ${connection} - ${error}`
        );
        app.notify.error(
          `mongodb: Max retries reached. Unable to connect to MongoDB - ${connection} - ${error}`
        );
        app.set("mongodbClient", null);
      }
    });
  app.set("mongodbClient", mongoClient);
};
