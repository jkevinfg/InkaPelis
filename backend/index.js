const express = require('express');
const app = express();
const {config} = require('./config/index');
const moviesApi = require('./routes/movies');



//body parser
app.use(express.json());

moviesApi(app);





app.listen(config.port  , () => {
    console.log(`Server on port ${config.port}`)
} )

