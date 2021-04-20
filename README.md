# Feathers-React-Starter

<img margin="auto" src="https://i.ibb.co/rG3FTQF/hero.png"/>

#### Why Ant Design

 [**Ant Design**](https://ant.design) is a React UI library that has a plethora of easy-to-use components that are useful for building elegant user interfaces. [Read More](https://hackernoon.com/interesting-javascript-libraries-born-in-china-d50d1bb81355)

#### Why Redux (Toolkit)

- [**Redux**](https://redux.js.org/) is a predictable state container for JavaScript applications. It helps you write applications that behave consistently and are easy to test. [Read More](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/)
  
- [**Redux Toolkit**](https://redux-toolkit.js.org/)  is the official, opinionated, batteries-included toolset for efficient *Redux* development. [Read More](https://medium.com/the-andela-way/why-you-should-use-redux-toolkit-2b73a8e2f75a)

## Requirements

- [NodeJS](https://nodejs.org)
- [npm](https://npmjs.com) or [yarn](https://yarnpkg.com)
- [MongoDB](https://www.mongodb.com)

## Installation

1. Clone the repository or use the [Github CLI](https://cli.github.com/) and create a new repository using this template.

    ```bash
    git clone https://github.com/ingeniousambivert/Feathers-React-Starter.git
    git checkout dev 
    ```

2. Use [yarn](https://yarnpkg.com/) to install all the dependencies.

    *directory* - web / server  

    ```bash
    cd directory
    yarn
    ```

## Usage

*directory* - web / server

```bash
cd directory
yarn start
```

Open <http://localhost:3000>

### Web

- The [*config-overrides.js*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/antd-dev/web/config-overrides.js) consists of the module aliases or various components and files. And an [*override*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/antd-dev/web/config-overrides.js) for the Ant Design theme override.

- The [*.env*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/.env) of the *NODE_ENV* configurations (API_URL, PORT, etc).

- The [*src*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src) the main code for the React App.
  - [*assets*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/assets) - All static assets : SCSS, LESS, Media.
  - [*client*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/client) - The Feathers Client configured with [Axios](https://github.com/axios/axios) to communicate to the *API*.
  - [*components*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/components) - All isolated UI components.
  - [*containers*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/containers) - Containers to hold the UI of individual pages.
  - [*layouts*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/layouts) - Page layouts (Header, Footer).
  - [*pages*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/pages) - Individual pages composed of containers and wrapped with page layouts. All the side-effects happen here.
  - [*routes*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/routes) - All the page routes passed through the customized public, private and admin routes.
  - [*store*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/store) - The Redux Store configured with *slices*, *reducers* and *state persistance*.
    - *auth slice* : Consists of the authentication (signUp, signIn, etc) related thunks, reducers and actions.
    - *user slice* : Consists of the user (loadUser, updateUser, etc) related thunks, reducers and actions.
    - *admin slice* : Consists of the admin (loadAllUsers, resetUserPassword, etc) related thunks, reducers and actions.
  - [*theme*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/theme) - Custom theme (few options overridden) for Ant Design.

  - [*utils*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web/src/utils) - Useful but generic methods and components.

### Server

- The [*config*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/config) in the **server** consists of *default*, *production*, *test* configurations.
  - *default.json* - All the default configurations for Feathers, Node and MongoDB. It also consists of the authentication config (*Local Auth*).
  
- The [*package.json*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/package.json) in the **server** consists of the scripts and module aliases of different modules and services.

- The [*src*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src) in the **server** consists the main code for the Feathers Server.
  - [*auth*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/auth) - Authentication Service implementation, comes configured with JWT Strategy.
  - [*errors*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/errors) - Feathers Errors and Global Error Handler.
  - [*hooks*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/hooks) - Hooks (pluggable middleware functions) for Feathers App
  - [*middleware*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/middleware) - Express middleware. To configure extra Express Modules. Also allows customizing services.
  - [*models*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/models) - Mongoose Models for individual services. (Users)
  - [*services*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/services) - The core of feathers - services. Basically instance of a class that contains your business logic.
    - *authmanagement* : Consists of the implementation of the authentication-management module, a notifier that utilises the *mailer* service to send emails on appropriate cases and hooks to verify the JWT on appropriate cases.
    - *user* : Consists of the user class with a method to create a user model and hooks that carry various functions and also set permissions .
    - *mailer* : Consists of a simple mailer module that wraps around the *node-mailer* package and implements a GMAIL based SMTP Transport.
  - [*utils*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/src/utils) - Extra utility methods
  
- The [*mongoose.js*](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server/mongoose.js) in the **server** is the instantiation of the Mongoose Module. It configures some connection options and exports the mongoose client.

### Read More

- [Web](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/web)
- [Server](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/antd-dev/server)

## Built with

**Web** :

- [React](https://www.reactjs.org)
- [Ant Design](https://ant.design)
- [Redux Toolkit](https://redux-toolkit.js.org/)

**Server** :

- [Feathers](https://docs.feathersjs.com)
- [NodeJS](https://nodejs.org)

**Database** :

- [MongoDB](https://www.mongodb.com)
- [Mongoose](https://mongoosejs.com/)

## Todo

- [x] Ant Design UI Library w/ Custom Theme
- [x] Module Aliases, ESLint and Prettier for server and web. Customize CRA with HMR and PropTypes Check for web.
- [x] Redux Toolkit for State Management
- [x] [Authentication/User Management](https://github.com/feathersjs-ecosystem/feathers-authentication-management/blob/master/docs.md) in the server
- [x] Move to [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) in the web (Customized)
- [x] [Role Management/Permissions](https://github.com/feathersjs-ecosystem/feathers-permissions) in the server
- [x] Admin Dashboard in the web
- [ ] Data validation in the server with [joi](https://joi.dev/api/) or [JSON Schema](https://simonplend.com/how-to-handle-request-validation-in-your-express-api/)
- [ ] More test cases for server and snapshot testing for web w/ [Jest](https://jestjs.io/)
- [ ] [Storybook](https://storybook.js.org/) for web

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Terms and License

- Released under the [MIT](https://choosealicense.com/licenses/mit/) License.
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the boilerplate.
- Attribution is not required, although it is really appreciated.
