import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { safety } from "@/utils/safety.js";

class S3 {
  static build(app) {
    return new S3(app);
  }

  constructor(app) {
    this.app = app;
    this.client = new S3Client({
      region: app.get("aws").region,
      credentials: {
        accessKeyId: app.get("aws").accessKey,
        secretAccessKey: app.get("aws").secretKey
      }
    });
  }

  getObjectKey(url) {
    const match = url.match(/:\/\/[^/]*(\/.*)$/);
    return match ? match[1] : null;
  }

  getPublicObjectUrl({ bucket, key }) {
    const baseUrl = `https://${bucket}.s3.${this.app.get("aws").region}.amazonaws.com`;
    const objectUrl = `${baseUrl}/${key}`;
    return objectUrl;
  }

  async upload(params) {
    const process = async (params) => {
      if (params.Key && params.Body && params.Bucket) {
        const command = new PutObjectCommand(params);
        return await this.client.send(command);
      } else {
        throw new Error("params.Key || params.Body || params.Bucket missing");
      }
    };
    const response = await safety(process(params));
    if (response.error) {
      this.app.notify(`"integrations:aws:s3:upload"${error.message}`);
      this.app.logger.error("integrations:aws:s3:upload", error);
    }
    return response;
  }

  async download(params) {
    const process = async (params) => {
      if (params.Key && params.Bucket) {
        const command = new GetObjectCommand(params);
        return await this.client.send(command);
      } else {
        throw new Error("params.Key || params.Bucket missing");
      }
    };
    const response = await safety(process(params));
    if (response.error) {
      this.app.notify(`"integrations:aws:s3:download"${error.message}`);
      this.app.logger.error("integrations:aws:s3:download", error);
    }
    return response;
  }

  async delete(params) {
    const process = async (params) => {
      if (params.Key && params.Bucket) {
        const command = new DeleteObjectCommand(params);
        return await this.client.send(command);
      } else {
        throw new Error("params.Key || params.Bucket missing");
      }
    };
    const response = await safety(process(params));
    if (response.error) {
      this.app.notify(`"integrations:aws:s3:delete"${error.message}`);
      this.app.logger.error("integrations:aws:s3:delete", error);
    }
    return response;
  }
}

export default (app) => {
  app.integrations["s3"] = S3;
};
