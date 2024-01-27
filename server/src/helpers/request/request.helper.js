import axios from "axios";

class Request {
  static build(app, options) {
    return new Request(app, options);
  }

  constructor(app, options) {
    this.app = app;
    this.client = axios.create(options);
  }

  #processJson(request) {
    return request
      .then((response) => {
        if (response.headers["content-type"].includes("application/json")) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(new Error("Response is not in JSON format"));
        }
      })
      .catch((error) => {
        this.app.logger.error("helpers:request:process:json:", error);
        return Promise.reject(error);
      });
  }

  #processRaw(request) {
    return request
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        this.app.logger.error("helpers:request:process:raw:", error);
        return Promise.reject(error);
      });
  }

  get(url, params = {}, process = "json") {
    const request = this.client.get(url, params);
    switch (process) {
      case "json":
        return this.#processJson(request);
      default:
        return this.#processRaw(request);
    }
  }

  post(url, data = {}) {
    return this.#processJson(this.client.post(url, data));
  }

  put(url, data = {}, params = {}) {
    return this.#processJson(this.client.put(url, data, params));
  }

  patch(url, data = {}, params = {}) {
    return this.#processJson(this.client.patch(url, data, params));
  }

  delete(url, params = {}) {
    return this.#processJson(this.client.delete(url, params));
  }
}

export default (app) => {
  app.helpers["request"] = Request;
};
