# Server

> Feathers Server for the Starter Kit

## About

This is the [Feathers](http://feathersjs.com) App/Server for the Feathers-React Starter kit. It was bootstapped with [Feathers Generator](https://docs.feathersjs.com/guides/basics/generator.html). It constitutes of a pre-configured **REST API** with [**local authentication**](https://docs.feathersjs.com/api/authentication/local.html), [**authentication management**](https://github.com/feathersjs-ecosystem/feathers-authentication-management/blob/master/docs.md) and [**permissions/role management**](https://github.com/feathersjs-ecosystem/feathers-permissions).

## Getting Started

Getting up and running is simple.

1. Make sure you have [NodeJS](https://nodejs.org/), [npm](https://www.npmjs.com/) and [MongoDB](https://www.mongodb.com/) installed.
2. Install your dependencies.

```bash
cd path/to/server
npm install
```

3.1 Start your server.

```bash
npm start
```

3.2 Start your server in development mode.

```bash
npm run dev
```

## Configuration

The default configuration is generated automatically using the *Feathers Generator*.It consists of the default host, port, pagination options, authentication options.

After configuring the databases with the services you will have to manually add the database URIs to the `${ENVIRONMENT}.json`.

To work in development mode. Add a `development.json` to `config/`. And add your development variables, credentials there.

To configure the *mailer* module. Add the following object in the `${ENVIRONMENT}.json`.

```js
 {
 "mailerUsername": "yourUsername",
 "mailerPassword": "yourPassword",
 "clientURL": "http://your-client-app.com",
 "fromEmail": "no-reply@your-compnay-name.com"
 }
```

Replace all the development credentials with production credentials in the `production.json` before deploying.

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```bash
npm install -g @feathersjs/cli          # Install Feathers CLI

feathers generate service               # Generate a new Service
feathers generate hook                  # Generate a new Hook
feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
