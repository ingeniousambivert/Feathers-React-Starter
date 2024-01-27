import { Worker, MetricsTime } from "bullmq";
import loadProcessor from "@/automations/load/load.processor.js";

export default (app) => {
  return new Worker(app.get("automation")["queues"]["load"], loadProcessor, {
    useWorkerThreads: true,
    connection: app.get("redis"),
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 75 },
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2
    }
  });
};
