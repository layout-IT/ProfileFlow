A project for development using Webpack, React, and other modern tools. It includes support for code linting via ESLint and formatting via Prettier. It also features deployment to GitHub Pages.

## Versions

- **Node.js**: v20.13.1
- **React**: v19.0.0

## Registration Requirements

To register for the service, use the following details:

- **Email**: `aleksei@example.com`
- **Password**: `lkJlkn8hj`

## Installation

1. Clone the repository:

   git clone https://github.com/layout-IT/ProfileFlow.git

2. Navigate to the project directory:
   cd ProfileFlow

3. Install dependencies:
   npm install

## Scripts

The project includes the following scripts:

1. npm run format: Runs Prettier to format the code.
2. npm run lint: Checks the code with ESLint.
3. npm run lint-fix: Fixes errors found by ESLint.
4. npm run build:dev: Builds the project for development with Webpack.
5. npm run build:prod: Builds the project for production mode with Webpack.
6. npm run start: Starts the development server with Webpack.
7. npm run predeploy: Builds the project for deployment.
8. npm run deploy: Deploys to GitHub Pages.

## Description

A chain of asynchronous requests has been implemented for two long-running operations on the backend. First, a request is made to retrieve the author's name, then, after its completion, a quote from that author is requested. The results, consisting of the author's name and the quote, are displayed on the user's profile. Before both requests are completed, the user can stop the process by pressing the "Cancel" button.
