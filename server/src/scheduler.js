import { app } from "./app.js";
import util from "util";
import { getDate, getMonth, getYear, format } from "./utils/index.js";
import fulfillmentWorker from "./workers/fulfillment.worker.js";
import syncWorker from "./workers/sync.worker.js";
import loadWorker from "./workers/load.worker.js";
import { QueueEvents } from "bullmq";

app.setup();
process.setMaxListeners(15);

const queues = [];

async function shutdown(queues) {
  const pauseQueue = (queue) => {
    app.logger.info(`Paused worker: ${queue.name}`);
    return queue.pause(true);
  };
  await Promise.all(queues.map(pauseQueue));
  queues.map((queue) => app.logger.info(`Paused worker: ${queue.name}`));
  process.exit(0);
}

const initSync = async function (app) {
  const worker = syncWorker(app);
  const queue = app.automation("sync");
  const queueEvents = new QueueEvents(app.get("automation")["queues"]["sync"], {
    connection: app.get("redis")
  });

  const currentTimeStamp = new Date();
  currentTimeStamp.setDate(currentTimeStamp.getDate() + 1);
  const day = getDate(currentTimeStamp);
  const month = getMonth(currentTimeStamp) + 1;
  const year = getYear(currentTimeStamp);
  const date = format(currentTimeStamp, "yyyy-MM-dd");

  await queue.add(
    app.get("automation")["queues"]["sync"],
    { day, month, year, date },
    {
      repeat: {
        pattern: app.get("automation")["jobs"]["sync"]
      }
    }
  );
  app.logger.info(`scheduler:sync: 1 job added for date: ${date}`);
  app.notify.event(`scheduler:sync: 1 job added for date: ${date}`);
  queues.push(queue);

  queue.on("waiting", (job) => {
    app.logger.info(`scheduler:sync: job waiting | job: ${JSON.stringify(job)}`);
  });

  queueEvents.on("progress", ({ jobId, data }) => {
    app.logger.info(`scheduler:sync: job progress | id: ${jobId} | data: ${JSON.stringify(data)}`);
  });

  worker.on("error", (error) => {
    app.logger.error(`scheduler:sync:error: ${error}`);
    app.notify.error(`scheduler:sync:error: ${error.message} | ${error.stack}`);
  });

  worker.on("completed", (job, returnvalue) => {
    app.logger.info(
      `scheduler:sync: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
    app.notify.event(
      `scheduler:sync: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
  });

  worker.on("failed", (job, failedReason) => {
    app.logger.error(`scheduler:sync: job:id ${job.id} failed. ${failedReason}`);
    app.notify.error(`scheduler:sync: job:id ${job.id} failed. ${failedReason}`);
  });
  app.logger.info(`Started worker: ${worker.name}`);
};

const initLoad = async function (app) {
  const worker = loadWorker(app);
  const queue = app.automation("load");
  const queueEvents = new QueueEvents(app.get("automation")["queues"]["load"], {
    connection: app.get("redis")
  });

  queue.on("waiting", (job) => {
    app.logger.info(`scheduler:load: job waiting | job: ${JSON.stringify(job)}`);
  });

  queueEvents.on("progress", ({ jobId, data }) => {
    app.logger.info(`scheduler:load: job progress | id: ${jobId} | data: ${JSON.stringify(data)}`);
  });

  worker.on("error", (error) => {
    app.logger.error(`scheduler:load:error: ${error}`);
    app.notify.error(`scheduler:load:error: ${error.message} | ${error.stack}`);
  });

  worker.on("completed", (job, returnvalue) => {
    app.logger.info(
      `scheduler:load: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
    app.notify.event(
      `scheduler:load: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
  });

  worker.on("failed", (job, failedReason) => {
    app.logger.error(`scheduler:load: job:id ${job.id} failed. ${failedReason}`);
    app.notify.error(`scheduler:load: job:id ${job.id} failed. ${failedReason}`);
  });
  app.logger.info(`Started worker: ${worker.name}`);
};

const initFulfillment = async function (app) {
  const worker = fulfillmentWorker(app);
  const queue = app.automation("fulfillment");
  const queueEvents = new QueueEvents(app.get("automation")["queues"]["fulfillment"], {
    connection: app.get("redis")
  });

  queue.on("waiting", (job) => {
    app.logger.info(`scheduler:fulfillment: job waiting | job: ${JSON.stringify(job)}`);
  });

  queueEvents.on("progress", ({ jobId, data }) => {
    app.logger.info(`scheduler:fulfillment: job progress | id: ${jobId} | data: ${JSON.stringify(data)}`);
  });

  worker.on("error", (error) => {
    app.logger.error(`scheduler:fulfillment:error: ${error}`);
    app.notify.error(`scheduler:fulfillment:error: ${error.message} | ${error.stack}`);
  });

  worker.on("completed", (job, returnvalue) => {
    app.logger.info(
      `scheduler:fulfillment: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
    app.notify.event(
      `scheduler:fulfillment: completed job | id: ${job.id} successfully : ${JSON.stringify(returnvalue)}`
    );
  });

  worker.on("failed", (job, failedReason) => {
    app.logger.error(`scheduler:fulfillment: job:id ${job.id} failed. ${failedReason}`);
    app.notify.error(`scheduler:fulfillment: job:id ${job.id} failed. ${failedReason}`);
  });
  app.logger.info(`Started worker: ${worker.name}`);
};

const initScheduler = (app) => {
  app.logger.info(`Started scheduler: ${String(process.env.NODE_ENV).toUpperCase()}`);
  initSync(app);
  initLoad(app);
  initFulfillment(app);
};

initScheduler(app);

process.on("SIGTERM", () => {
  shutdown(queues);
});

process.on("SIGINT", () => {
  shutdown(queues);
});

process.on("unhandledRejection", (reason, promise) => {
  app.logger.error(
    `scheduler: unhandled rejection at: ${util.inspect(promise)} reason: ${util.inspect(reason)}`
  );
  app.notify.error(
    `scheduler: unhandled rejection at: ${util.inspect(promise)} reason: ${util.inspect(reason)}`
  );
});

process.on("uncaughtException", (error) => {
  app.logger.error(`scheduler: uncaught exception: ${util.inspect(error)}`);
  app.notify.error(`scheduler: uncaught exception: ${util.inspect(error)}`);
});
