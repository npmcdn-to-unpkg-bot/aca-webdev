# React Frontend
The frontend of Semantic Health is based on [React](https://facebook.github.io/react/). On top of React, we used a package called [searchkit](http://searchkit.co/) to create an UI for Elasticsearch. Many thanks to the folks at searchkit for this amazing piece of software. We were able to put this project together in a matter of a few weeks.

### Installation and Setup
Install [Node.js](https://nodejs.org/en/download/) first. Then update npm:

    npm install npm -g

Install webpack globally. Install npm modules and transpile js into `bundle.js`.

    npm install -g webpack
    npm install    
    webpack

Copy `bundle.js` to the app/static/js directory in `flask-backend` folder
