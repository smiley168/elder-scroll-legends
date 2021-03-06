### Overview

This is the web application for the Elder Scroll Legends API /v1/cards endpoint that is encapsulated by a GraphQL server to query and manipulate the response data easily. 

Here is the GitHub link to our GraphQL server application: https://github.com/smiley168/elder-scroll-legends-gql

Here is the demo deployed GraphQL playground in Heroku: https://elder-scroll-legends.herokuapp.com/

### Prerequisities

Install latest Node and NPM (or NPX)

1. [Install Node.js](https://nodejs.org/en/download/package-manager/)

1. [Install NPM](https://www.npmjs.com/get-npm)

1. [Install NPX](https://www.npmjs.com/package/npx) - 


### Project creation

1. npx create-react-app elder-scroll-legends

1. Install the material-ui dependencies

1. Install the Apollo GraphQL client


### Getting Started

There are 2 repositories you need to pull from Github to run both locally.

1. the GraphQL application repository - see details below
1. the React application repository - see details below

#### Clone the GraphQL application repository from Github

```git clone git@github.com:smiley168/elder-scroll-legends-gql.git```

#### Install the dependencies

```npm install```

#### Start the GraphQL server locally

1. ```npm run start```
1. The Apollo GraphQL client url is currently hardcoded to use port 4000 at "http://localhost:4000/". If you don't have a port conflict, you can open the GraphQL playground at http://localhost:4000/ to play with the [supported GraphQL queries](https://github.com/smiley168/elder-scroll-legends-gql#currently-supported-queries).
1. See the [GraphQL server application repo](https://github.com/smiley168/elder-scroll-legends-gql) for more details.

#### Clone the React application repository from Github 

```git clone git@github.com:smiley168/elder-scroll-legends.git```

#### Install the dependencies

1. ```cd elder-scroll-legends```

1. ```npm install```

#### Run the web application locally in development mode

1. ```npm start```

1. Open http://localhost:3000 to view it in the browser.

1. When you make changes to the code running in development mode, the page will automatically reload with your changes.


#### Deployment to Heroku

1. ```heroku create elder-scroll-legends --buildpack mars/create-react-app```

1. ```git remote set-url heroku https://git.heroku.com/elder-scroll-legends.git```

1. ```git push heroku master```

1. ```heroku open```

Note: you might need to use a different app name than `elder-scroll-legends` in Heroku since I have already taken that app name.

Learn more on how to deploy to this react app to Heroku [here](https://github.com/mars/create-react-app-buildpack)

### Working Demo link in Heroku

https://elder-scroll-legends.herokuapp.com/



### To Dos

#### Context

We are using the fetchMore function and the updateQuery function provided by Apollo GraphQL in the InfiniteScroll component. In normal use cases, it is functioning as expected. However, when the Elder Scroll Legends API server returns an empty array, there is [an issue](https://github.com/apollographql/react-apollo/issues/3468): When fetchMore gets an empty array from the server, updateQuery is called as it should be, but the component never rerenders, thus loading being indefinitely true. 

#### To do: Improve empty array API response handling 

We will need to find a better way to handle the empty array response from the API to fall back gracefully instead of showing the "Loading..." text forever at the end.

#### Context

We are using the Material-UI CSS for the card UI because it facilitates faster development. However, it is not the most flexible styleguide to be used in my opinion. 

#### To do: Use a easier to customize CSS styling library

We can use customized style-components that would make the styling CSS more readeable for team development.

#### Context

When one runs the web application for the first time on their browser, it takes longer time to render the initial application. It becomes faster when you enter search terms to filter the results. The slow first time rendering is due to this application only doing client-side rendering.

#### To do: Add Server-Side rendering (SSR) to improve first loading time

We can implement server-side rendering to make the first time loading of the application faster.

#### Context

The search box is currently in the middle of the page which takes up a good portion of the above-the-fold of the page: i.e. less space for the actual cards.

#### To do: Incorporate the Search box UI into the header 

Incorporate the Search box UI into the header on the top right hand corner to save space for the actual cards rendering.


#### Context

Ideally, given enough development time, I would write more tests to cover the code I wrote to increase test coverage. Currently, I only have 1 test to ensure the app does not crash.

#### To do: Write more tests

If I have more time, I would like to write more tests to increase test coverage. 

#### Context

The current loading GIF is not styled to its best.

#### To do: re-style the loading GIF

If I have more time, I would like to style the loading GIF to look nicer on the UI.
