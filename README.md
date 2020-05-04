### Prerequisities

Install latest Node and NPM (or NPX)

1. [Install Node.js](https://nodejs.org/en/download/package-manager/)

1. [Install NPM](https://www.npmjs.com/get-npm)

1. [Install NPX](https://www.npmjs.com/package/npx)


### Project creation

1. npx create-react-app elder-scroll-legends

1. Install the material-ui dependencies

1. Install the Apollo GraphQL client


### Getting Started

#### Clone the repository from Github

git clone git@github.com:smiley168/elder-scroll-legends.git

#### Install the dependencies

1. cd elder-scroll-legends

1. npm install

#### Run the web application locally in development mode

1. npm start

1. Open http://localhost:3000 to view it in the browser.


#### Deployment to Heroku

1. heroku create llei-elder-scroll-legends-1 --buildpack mars/create-react-app

1. git remote set-url heroku https://git.heroku.com/llei-elder-scroll-legends-1.git

1. git push heroku master 

1. heroku open

Learn more on how to deploy to this react app to Heroku [here](https://github.com/mars/create-react-app-buildpack)

### Working Demo link in Heroku

https://llei-elder-scroll-legends-1.herokuapp.com/



### To Dos

#### Context

We are using the fetchMore function and the updateQuery function provided by Apollo GraphQL in the InfiniteScroll component. In normal use cases, it is functioning as expected. However, when the Elder Scroll Legends API server returns an empty array, there is [an issue](https://github.com/apollographql/react-apollo/issues/3468): When fetchMore gets an empty array from the server, updateQuery is called as it should be, but the component never rerenders, thus loading being indefinitely true. 

#### To do

We will need to find a better way to handle the empty array response from the API to fall back gracefully instead of showing the "Loading..." text forever at the end.

#### Context

We are using the Material-UI CSS for the card UI because it facilitates faster development. However, it is not the most flexible styleguide to be used in my opinion. 

#### To do

We can use customized style-components that would make the styling CSS more readeable for team development.
