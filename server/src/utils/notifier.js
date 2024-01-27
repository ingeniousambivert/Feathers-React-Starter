import { app } from "@/app.js";
import { createTimestamp } from "@/utils/index.js";
import request from "axios";

const PID = process.pid;
const { datePart, timePart } = createTimestamp();

const notify = {
  error: async function (message) {
    if (process.env.NODE_ENV === "production") {
      try {
        const errorMessage = `[${PID}][${datePart}][${timePart}] ${message}`;
        const errorDetails = await request.post(app.get("webhooks").errorUrl, { text: errorMessage });
        return errorDetails;
      } catch (error) {
        app.logger.error("utils:notify:error", error);
      }
    }
  },
  event: async function (message) {
    if (process.env.NODE_ENV === "production") {
      try {
        const eventMessage = `[${PID}][${datePart}][${timePart}] ${message}`;
        const eventDetails = await request.post(app.get("webhooks").eventUrl, { text: eventMessage });
        return eventDetails;
      } catch (error) {
        app.logger.error("utils:notify:event", error);
      }
    }
  }
};

export { notify };
