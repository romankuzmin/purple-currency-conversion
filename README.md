## Purple Currency Conversion App

The app is responsive and connected to API [https://purple-currency-conversion.herokuapp.com/graphql](https://purple-currency-conversion.herokuapp.com/graphql)

In app can:
* Convert currency
* Show dashboard with statistics
* Change locales (CS|EN|DE)

App using:
* Design - [Material UI](https://material-ui.com) using own implementation of [JSS](https://material-ui.com/styles/basics) under the hood
* Internationalization - [FormatJS/React-intl](https://formatjs.io/docs/react-intl)
* [React 16.8 Hooks](https://reactjs.org/docs/hooks-intro.html)
* [Apollo GraphQL](https://www.apollographql.com/)
* [Typescript](https://www.typescriptlang.org/)

API using:
* [NodeJS 12 LTS](https://nodejs.org/en)
* [Express](https://expressjs.com/) 
* [Apollo GraphQL](https://www.apollographql.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Postgres](https://www.postgresql.org/)
* [Typeorm](https://typeorm.io/)

### Demo runs on [Vercel](https://purple-currency-conversion.vercel.app/)

## Setup

The frontend app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Some settings were override with use [customize-cra](https://github.com/arackaf/customize-cra) and [react-app-rewired](https://github.com/timarney/react-app-rewired#readme).

Clone the repo 

#### `git clone https://github.com/romankuzmin/purple-currency-conversion.git`

Run

#### `npm install`

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the GraphQL API in the development mode.<br />
Open [http://localhost:4000/graphql](http://localhost:4000/graphql) to view it in the browser.

The API will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the GraphQL API for production to the `api/dist` folder.<br />

Your GraphQL API is ready to be deployed!

### `npm run lint`

Checks the GraphQL API code to see if it respects [Eslint's](https://eslint.org/) rules

### `npm run app:start`

Runs the app in the development mode.<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run app:test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run app:build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run app:eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run app:lint`

Checks the React app code to see if it respects [Eslint's](https://eslint.org/) rules

### `npm run release`

Release app by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) and use [standard-version](https://github.com/conventional-changelog/standard-version)   

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
