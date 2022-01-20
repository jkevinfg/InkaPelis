const express = require('express');
const helmet = require('helmet');
const app = express();

const { config } = require('./src/config/index');

const authApi = require('./src/routes/auth');
const moviesApi = require('./src/routes/movies.js');
const userMoviesApi = require('./src/routes/userMovies.js');

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./src/utils/middleware/errorHandlers.js');

const notFoundHandler = require('./src/utils/middleware/notFoundHandler');

// body parser
app.use(express.json());
app.use(helmet());

// routes
authApi(app);
moviesApi(app);
userMoviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    console.log(`Listening http://localhost:${config.port}`);
});