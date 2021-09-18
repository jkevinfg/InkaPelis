const express = require('express');
const app = express();
const {config} = require('./config/index');
const moviesApi = require('./routes/movies');

const { logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandlers')

const notFoundHandler = require('./utils/middleware/notFoundHandler');



//body parser
app.use(express.json());

moviesApi(app);

//catch 404
app.use(notFoundHandler);

//Errores middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);



app.listen(config.port  , () => {
    console.log(`Server on port ${config.port}`)
} )

