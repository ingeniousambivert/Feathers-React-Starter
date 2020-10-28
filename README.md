# Feathers-React-Starter

*Feathers-React-MongoDB* Stack Starter Kit.

## About

This starter constitutes of [**Feathers**](https://docs.feathersjs.com), [**MongoDB**](https://www.mongodb.com), [**React**](https://www.reactjs.org), [**Ant Design**](https://ant.design) and [**Redux Toolkit**](https://redux-toolkit.js.org/). It was bootstrapped with [Create React App](https://facebook.github.io/create-react-app/) and [Feathers Generator](https://docs.feathersjs.com/guides/basics/generator.html). The purpose of this project is to provide a starter template for *Feathers-React* Applications. It contains a pre-configured **REST API** with **Local Authentication** in the *server* and **State Management** in the *client*.

<!-- - [**React**](https://www.reactjs.org) is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”. [Read More](https://codetoart.com/blog/why-reactjs-reason-to-choose-for-your-next-project) -->

#### Why Ant Design

 [**Ant Design**](https://ant.design) is a React UI library that has a plethora of easy-to-use components that are useful for building elegant user interfaces. [Read More](https://hackernoon.com/interesting-javascript-libraries-born-in-china-d50d1bb81355)

#### Why Redux (Toolkit)

- [**Redux Toolkit**](https://redux-toolkit.js.org/)  is the official, opinionated, batteries-included toolset for efficient *Redux* development. [Read More](https://medium.com/the-andela-way/why-you-should-use-redux-toolkit-2b73a8e2f75a)

- [**Redux**](https://redux.js.org/) is a predictable state container for JavaScript applications. It helps you write applications that behave consistently and are easy to test. [Read More](https://blog.logrocket.com/why-use-redux-reasons-with-clear-examples-d21bffd5835/)

<!-- - [**Feathers**](https://docs.feathersjs.com) is a lightweight web-framework for creating real-time applications and REST APIs. [Read More](https://blog.feathersjs.com/why-we-built-the-best-web-framework-you-ve-probably-never-heard-of-until-now-176afc5c6aac#uniform-interfaces)
  
- [**MongoDB**](https://www.mongodb.com/) is a document database with the scalability and flexibility that you want with the querying and indexing that you need. [Read More](https://www.mongodb.com/why-use-mongodb#:~:text=Companies%20and%20development%20teams%20of,of%20both%20data%20and%20traffic.) -->

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

    *directory* - client / server  

    ```bash
    cd directory
    yarn
    ```

## Usage

*directory* - client / server

```bash
cd directory
yarn start
```

Open <http://localhost:3000>

## Overview

> It is presumed that if you are using this starter you are familiar with **Javascript** and atleast the basics of **Feathers**, **Express**, **NodeJS**, **MongoDB**, **Mongoose** and **React**.

### Client

- The [*config-overrides.js*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/config-overrides.js) in the **client** consists of the module aliases : *@client*, *@components*, *@layouts*, *@slices*, *@utils*, *@pages*, *@images*. And an [*override*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/theme/overrides.js) for the Ant Design theme override.

- The [*.env*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/.env) in the **client** consists of the *NODE_ENV* configurations (API_URL, PORT, etc).

- The [*src*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src) in the **client** consists the main code for the React App. Check out the project tree below for details.
  - [*assets*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/assets) - All static assets : SCSS, LESS, Media.
  - [*client*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/client) - The Feathers Client configured with [Axios](https://github.com/axios/axios) to communicate to the *API*.
  - [*components*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/components) - All isolated UI components.
  - [*layouts*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/layouts) - Page layouts (Header, Footer).
  - [*pages*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/pages) - Individual pages composed of the UI components and wrapped with page layouts.
  - [*routes*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/routes) - All the page routes passed through the customized public and private routes.
  - [*store*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/store) - The Redux Store configured with *slices*, *reducers* and *state persistance*.
    - *auth slice* : Consists of the *Signup*, *Signin* and *Signout* - thunks, reducers and actions. It also has three *selectors* - *Error*, *UserID* and *IsAuthenticated*.
    - *user slice* : Consists of *Load* and *Update* - thunks, reducers and actions. It also has two *selectors* - *Error* and *User*.
  - [*theme*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/theme) - Custom theme (few options overridden) for Ant Design.

  - [*utils*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/client/src/utils) - Extra utility methods and components.

### Server

- The [*config*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/config) in the **server** consists of *default*, *production*, *test* configurations.
  - *default.json* - All the default configurations for Feathers, Node and MongoDB. It also consists of the authentication config (*Local Auth*).
  
- The [*package.json*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/package.json) in the **server** consists of the module aliases : *@app*, *@services*, *@hooks*, *@errors*.

- The [*src*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src) in the **server** consists the main code for the Feathers Server. Check out the project tree below for details.
  - [*auth*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/auth) - Authentication Service implementation, comes configured with JWT Strategy.
  - [*errors*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/errors) - Feathers Errors and Global Error Handler.
  - [*hooks*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/hooks) - Hooks (pluggable middleware functions) for Feathers App
  - [*middleware*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/middleware) - Express middleware. To configure extra Express Modules. Also allows customizing services.
  - [*models*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/models) - Mongoose Models for individual services.
  - [*services*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/services) - The core of feathers - services. Basically instance of a class that contains your business logic.
  - [*utils*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/src/utils) - Extra utility methods
  
- The [*mongoose.js*](https://github.com/ingeniousambivert/Feathers-React-Starter/blob/main/server/mongoose.js) in the **server** is the instantiation of the Mongoose Module. It configures some connection options and exports the mongoose client.

To get the best out of this starter know the project structure of both *client* and *server*. Given below is the complete directory tree for both the projects.

### Project Trees

#### Client

```bash
├── README.md
├── config-overrides.js
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.js
│   ├── assets
│   │   ├── images
│   │   │   ├── logo.png
│   │   │   └── logo.svg
│   │   ├── less
│   │   │   └── App.less
│   │   └── scss
│   │       └── style.scss
│   ├── client
│   │   └── index.js
│   ├── components
│   │   ├── home
│   │   │   ├── index.js
│   │   │   └── sections
│   │   │       └── user
│   │   │           ├── index.js
│   │   │           └── partials
│   │   │               ├── data.js
│   │   │               └── update.js
│   │   ├── landing
│   │   │   ├── index.js
│   │   │   └── utils
│   │   │       └── LandingRoute.js
│   │   ├── signin
│   │   │   ├── index.js
│   │   │   └── redirect
│   │   │       └── index.js
│   │   ├── signup
│   │   │   └── index.js
│   │   └── wrapper
│   │       └── index.js
│   ├── index.js
│   ├── layouts
│   │   ├── index.js
│   │   ├── pages
│   │   │   ├── NotFound.js
│   │   │   ├── PageFooter.js
│   │   │   └── PageHeader.js
│   │   └── partials
│   │       ├── Logo.js
│   │       └── NotfoundImage.js
│   ├── pages
│   │   ├── container
│   │   │   └── index.js
│   │   ├── home
│   │   │   └── index.js
│   │   ├── landing
│   │   │   └── index.js
│   │   ├── signin
│   │   │   ├── index.js
│   │   │   └── redirect
│   │   │       └── index.js
│   │   └── signup
│   │       └── index.js
│   ├── routes
│   │   ├── index.js
│   │   ├── protectedRoute
│   │   │   └── index.js
│   │   └── publicRoute
│   │       └── index.js
│   ├── serviceWorker.js
│   ├── store
│   │   ├── index.js
│   │   └── slices
│   │       ├── auth
│   │       │   └── index.js
│   │       └── user
│   │           └── index.js
│   ├── tests
│   │   ├── App.test.js
│   │   └── setupTests.js
│   ├── theme
│   │   └── overrides.js
├── └── utils
       ├── colors.js
       ├── greet.js
       ├── index.js
       └── spinner.js

```

#### Server

```bash
├── README.md
├── config
│   ├── default.json
│   ├── production.json
│   └── test.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── app.js
│   ├── auth
│   │   ├── authentication.hooks.js
│   │   └── authentication.js
│   ├── channels
│   │   └── channels.js
│   ├── errors
│   │   └── index.js
│   ├── hooks
│   │   └── app
│   │       └── app.hooks.js
│   ├── middleware
│   │   └── index.js
│   ├── models
│   │   └── users.model.js
│   ├── mongoose.js
│   ├── server.js
│   ├── services
│   │   ├── index.js
│   │   └── users
│   │       ├── users.class.js
│   │       ├── users.hooks.js
│   │       └── users.service.js
│   └── utils
│       └── logger.js
├── test
    ├── app.test.js
    ├── authentication.test.js
    └── services
     └── users.test.js
```

### Read More

- [Client](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/main/client#client)
- [Server](https://github.com/ingeniousambivert/Feathers-React-Starter/tree/main/server#server)

## Built with

**Client** :

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
- [x] ESLint for server and client. And Prettier for client
- [x] Redux Toolkit for State Management
- [x] PropTypes Check
- [x] Customize CRA with HMR
- [x] Module Aliases for client and server
- [ ] [Authentication/User Management](https://github.com/feathersjs-ecosystem/feathers-authentication-management/blob/master/docs.md) in the server
- [ ] Move to [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) in the client
- [ ] More test cases for server and snapshot testing for client w/ [Jest](https://jestjs.io/)
- [ ] [Storybook](https://storybook.js.org/) for client

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Terms and License

- Released under the [MIT](https://choosealicense.com/licenses/mit/) License.
- Use it for personal and commercial projects, but please don’t republish, redistribute, or resell the boilerplate.
- Attribution is not required, although it is really appreciated.
