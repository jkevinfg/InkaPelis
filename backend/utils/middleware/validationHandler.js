const boom = require('@hapi/boom');


function validate(){
    return false;
}

function validateHandler (schema, check = "body") {
    return function(req,res,next){
        const error = validate(req[check], schema)
        error ? next(new Error(boom.badRequest(error))) : next();
    }
}

module.exports = validateHandler;

