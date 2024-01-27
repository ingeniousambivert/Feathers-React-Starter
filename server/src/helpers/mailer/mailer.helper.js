class Mailer {
  static build(app, options = {}) {
    return new Mailer(app, options);
  }

  constructor(app, options = {}) {
    this.options = options;
    this.app = app;
    this.config = this.app.get("mailer");
    this.live = this.app.get("live");
    //TODO implement a mailer module
    this.transporter = (data) => {
      return Promise.resolve(data);
    };
  }

  async send(data) {
    const payload = data;
    payload.from = this.config.email;

    if (this.live) {
      try {
        const response = await this.transporter(payload);
        this.app.logger.info(`helpers:mailer:send:${JSON.stringify(response)}`);
        return Promise.resolve(response);
      } catch (error) {
        this.app.notify.error(`helpers:mailer:send:${error.message} | ${error.stack}`);
        this.app.logger.error(`helpers:mailer:send:${error.message} | ${error.stack}`);
        return Promise.reject(error);
      }
    } else {
      this.app.logger.info(`helpers:mailer:send:DEVELOPMENT-MODE:${JSON.stringify(payload)}`);
      return Promise.resolve(payload);
    }
  }
}

export default (app) => {
  app.helpers["mailer"] = Mailer;
};
