import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import webpack from 'webpack';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import serverRoutes from '../frontend/routes/serverRoutes';
import Layout from '../frontend/components/Layout';

import reducer from '../frontend/reducers';
import getManifest from './getManifest';

import cookieParser from 'cookie-parser';
import boom from '@hapi/boom';
import passport from 'passport';
import axios from 'axios';


const { config } = require("./config");

const app = express();


// body parser
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: config.sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());


//  Basic strategy
require("./utils/auth/strategies/basic");

// OAuth strategy
require("./utils/auth/strategies/oauth");

// Twitter strategy
require("./utils/auth/strategies/twitter");



if (config.dev === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: config.port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) req.hashManifest = getManifest();
    next();
  });
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies());
  app.disable('x-powered-by');
}

const setResponse = (html, preloadedState, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js';

  return (`
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>InkaPelis</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
      </script>
      <script src="${mainBuild}" type="text/javascript"></script>
    </body>
  </html>
  `);
};


//mylist, trends, originals, searchResult
const renderApp = async (req, res) => {
  let initialState;
  const { token, email, name, id } = req.cookies;
  const myList = [];

  try {

    let movieList = await axios({
      url: `${config.apiUrl}/api/movies`,
      headers: { Authorization: `Bearer ${token}`},
      method: 'get',
    });

    let userMovies = await axios({
      url: `${config.apiUrl}/api/user-movies/?userId=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'get',
    });

    movieList = movieList.data.data;
    userMovies = userMovies.data.data;
   
    userMovies.forEach((userMovie) => {
      movieList.forEach((movie) => {
        if (movie._id === userMovie.movieId) {
          movie._id = userMovie._id;
          myList.push(movie);
        }
      });
    });

    initialState = {
      user: {
        id, email, name,
      },
      playing: {},
      myList,
      searchResult : [],
      trends: movieList.filter(movie => movie.contentRating === 'PG' &&movie._id),
      originals: movieList.filter(movie => movie.contentRating === 'G'&& movie._id)
    };
  } catch (err) {
    initialState = {
      user: {},
      playing: {},
      myList,
      searchResult : [],
      trends: [],
      originals: []
    }
  }
  
  const store = createStore(reducer, initialState);
  const preloadedState = store.getState();
  const isLogged = Boolean(initialState.user.id);

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Layout>
          {renderRoutes(serverRoutes(isLogged))}
        </Layout>
      </StaticRouter>
    </Provider>
  )
  res.send(setResponse(html, preloadedState, req.hashManifest));
};




app.post("/auth/sign-in", async function(req, res, next) {
  passport.authenticate("basic", function(error, data) {
    try {
      if (error || !data) {
        next(boom.unauthorized());
      }

      req.login(data, { session: false }, async function(error) {
        if (error) {
          next(error);
        }

        const { token, ...user } = data;

        res.cookie("token", token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        res.status(200).json(user);
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

app.post("/auth/sign-up", async function (req, res, next) {
  const { body: user } = req;

  try {
    const userData = await axios({
      url: `${config.apiUrl}/api/auth/sign-up`,
      method: "post",
      data: {
        'email': user.email,
        'name': user.name,
        'password': user.password
      }
    });
    res.status(201).json({
      name: req.body.name,
      email: req.body.email,
      id: userData.data.id
    });
  } catch (error) {
    next(error);
  }
});


app.get("/movies", async function(req, res, next) {});

//myList
app.post("/user-movies", async function(req, res, next) {
  try {
    const { body: userMovie } = req;
    const { token } = req.cookies;
    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: { Authorization: `Bearer ${token}` },
      method: "post",
      data: userMovie
    });

    if (status !== 201) {
      return next(boom.badImplementation());
    }

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

app.delete("/user-movies/:userMovieId", async function(req, res, next) {
  try {
    const { userMovieId } = req.params;
    const { token } = req.cookies;

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: { Authorization: `Bearer ${token}` },
      method: "delete"
    });

    if (status !== 200) {
      return next(boom.badImplementation());
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});



app.get(
  "/auth/google-oauth",
  passport.authenticate("google-oauth", {
    scope: ["email", "profile", "openid"]
  })
);

app.get(
  "/auth/google-oauth/callback",
  passport.authenticate("google-oauth", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.cookie('name', user.name);
    res.cookie('email', user.email);
    res.cookie('id', user.id);
    res.redirect('/');
  }
);

app.get("/auth/twitter", passport.authenticate("twitter"));

app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { session: false }),
  function(req, res, next) {
    if (!req.user) {
      next(boom.unauthorized());
    }

    const { token, user } = req.user;

    res.cookie("token", token, {
      httpOnly: !config.dev,
      secure: !config.dev
    });

    res.cookie('name', user.name);
    res.cookie('email', user.email);
    res.cookie('id', user.id);
    res.redirect('/');
  }
);
app.get('*', renderApp);
app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});