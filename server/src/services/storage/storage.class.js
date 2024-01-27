import { dataUriToUint8Array, generateId, isArrayofObjects } from "@/utils/index.js";
import { BadRequest } from "@/utils/errors.js";

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class StorageService {
  constructor(options) {
    this.options = options;
    this.app = options.app;
  }

  async get(id, _params) {
    return {
      id,
      text: `A new message with ID: ${id}!`
    };
  }
  async create(data, params) {
    try {
      const storage = this.app.integration("s3").build(this.app);
      const config = this.app.get("aws").s3;
      const result = [];
      if (isArrayofObjects(data)) {
        if (data.length > 0) {
          for (const item of data) {
            const id = generateId();
            const bucket = config.bucket;
            const key = typeof item.key === "string" ? item.key : `${id}.png`;
            const binaryData = dataUriToUint8Array(item.src);
            const response = await storage.upload({ Bucket: bucket, Key: key, Body: binaryData });
            if (response.error) {
              this.app.logger.error(`services:storage:class:create: ${error.message} | ${error.stack}`);
              this.app.notify.error(`services:storage:class:create: ${error.message} | ${error.stack}`);
              return Promise.reject(response.error);
            } else {
              const publicUrl = await storage.getPublicObjectUrl({ bucket, key });
              result.push(publicUrl);
            }
          }
        }
        return Promise.resolve(result);
      } else {
        throw new BadRequest("body: data should be of type {key,src}[]");
      }
    } catch (error) {
      this.app.logger.error(`services:storage:class:create: ${error.message} | ${error.stack}`);
      this.app.notify.error(`services:storage:class:create: ${error.message} | ${error.stack}`);
      return Promise.reject(error);
    }
  }

  async remove(id, _params) {
    return {
      id,
      text: "removed"
    };
  }
}

export const getOptions = (app) => {
  return { app };
};
