# Universal Scouter
This repository is the culmination of a half-semester long project for CIS 371 at GVSU. Deployment was done using
Google services, and can be publicly reached at https://famous-mix-275004.ue.r.appspot.com/.

## Architecture
The architecture of the application is a fully functional, full stack web app.

### Shared
This small module contains contains a few model classes that improve consistency from the client and server.
Because of the shared codebase, we can make complex queries easier, such as create tables on-the-fly. 
### Server
The server is a relatively simple Express.js/TypeScript API. All requests and steps to get to a response utilize the Promise()
api. A unique, challenging part of the API was a route that creates a table on-the-fly based upon properties within
a [Schema](https://github.com/kyle-flynn/universal-scouter/blob/df86875cbc0fea3cec0acf7e91784182935258fe/server/src/Database.ts#L94).
### Client
The client is a complex React.js/TypeScript web application built using the [Material-UI](https://material-ui.com/) framework.
Application routing is done using [React Router](https://reacttraining.com/react-router/web/guides/quick-start). Each view
is responsible for making one if not several API calls using the [Axios](https://www.npmjs.com/package/axios) library.
Upon receiving data from the API, it is converted into a model class outlined from the shared module.

## Deployment
Deployment was done using [Google's App Engine](https://cloud.google.com/appengine), and [Google's Cloud SQL](https://cloud.google.com/sql).
*Sidenote: You get $300 worth of free credits to use on Google's services! How convenient!* 

## Getting Started
Universal scouter is divided into 3 separate projects. The model used is a basic client/server architecture with some
shared codebase between the two projects. The stack is as follows:
* MySQL - Google Cloud SQL Services
* Express.js - Server/API
* React.js - Client-Side Application
* Node.js - Deployment platform
### `shared`
The shared module must be taken care of first. Follow these steps:
1. Install dependencies via `npm install`
2. Run the test suite via `npm test`
3. Build the application code via `npm run build`

### `client`
The next module is responsible for the front-end portion of the project.
1. Install dependencies via `npm install`
2. Build the application code via `npm run build`

### `server`
The last module is responsible for the back-end portion of the project.
1. Install dependencies via `npm install`
2. Build the application code via `npm run build`