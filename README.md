# Universal Scouter
This repository is the culmination of a half-semester long project for CIS 371 at GVSU. Deployment was done using
Google services, and can be publicly reached at https://famous-mix-275004.ue.r.appspot.com/.

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