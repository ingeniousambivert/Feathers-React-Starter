import { logger } from "@/utils/logger.js";

export const logCritical = async (context, next) => {
  try {
    await next();
  } catch (error) {
    logger.error(`app:error:stack:${JSON.stringify(error.stack)}`);
    if (error.data) {
      logger.error(`app:error:data:${JSON.stringify(error.data)}`);
    }
    throw error;
  }
};
