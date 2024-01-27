import { Worker, MetricsTime } from "bullmq";
import fulfillmentProcessor from "@/automations/fulfillment/fulfillment.processor.js";

export default (app) => {
  return new Worker(app.get("automation")["queues"]["fulfillment"], fulfillmentProcessor, {
    useWorkerThreads: true,
    connection: app.get("redis"),
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 75 },
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2
    },
    concurrency: 50
  });
};
