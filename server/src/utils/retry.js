import { logger } from "./logger.js";
import { safety } from "./safety.js";
import { getFunctionFileInfo } from "./index.js";

export async function retryOperation(operation, maxRetries = 5, delay = 1000, maxDelay = 10000) {
  const result = { data: null, error: null };

  const executeOperation = async (attempt) => {
    try {
      const { data, error } = await safety(operation());
      if (data) {
        result.data = data;
      } else {
        if (attempt < maxRetries) {
          const nextDelay = Math.min(delay * 2 ** attempt, maxDelay);
          const operationFileInfo = getFunctionFileInfo(operation);
          logger.info(
            `utils:retry: Retry attempt ${attempt + 1}. Retrying  [ ${
              operation.name
            } - ${operationFileInfo} ] after ${nextDelay / 1000} second/s.`
          );
          await new Promise((resolve) => setTimeout(resolve, nextDelay));
          await executeOperation(attempt + 1);
        } else {
          result.error = error;
        }
      }
    } catch (error) {
      result.error = error;
    }
  };
  await executeOperation(0);
  return result;
}
