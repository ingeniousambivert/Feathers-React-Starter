import { Worker, MetricsTime } from "bullmq";
import syncProcessor from "@/automations/sync/sync.processor.js";

export default (app) => {
  return new Worker(app.get("automation")["queues"]["sync"], syncProcessor, {
    useWorkerThreads: true,
    connection: app.get("redis"),
    removeOnComplete: { count: 50 },
    removeOnFail: { count: 75 },
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2
    }
  });
};
