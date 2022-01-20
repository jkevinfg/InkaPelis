const express = require('express');
const passport = require('passport');

const UserMoviesService = require('../services/userMovies');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');

// JWT strategy
require('../utils/auth/strategies/jwt');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();


  //para listar MyList necesito userID
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:user-movies']),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function(req, res, next) {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        res.status(200).json({
          data: userMovies,
          message: 'user movies listed'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  /*
    para agregar a una pelicula a Mylist(usermovie) necesito idPelicula , idUsuario
    const createUserMovieSchema = {
      userId: userIdSchema,
      movieId: movieIdSchema
    };
  */
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:user-movies']),
    validationHandler(createUserMovieSchema),
    async function(req, res, next) {
      const { body: userMovie } = req;
      try {

        const {userId , movieId} = userMovie;
        const userMovies = await userMoviesService.getUserMovies({ userId });
        
        let exist = true;
        userMovies.forEach(element => {
          if ( movieId === element.movieId ) {
            exist = false;
          }
        });

        if (exist) {
          const createdUserMovieId = await userMoviesService.createUserMovie({
            userMovie
          });
  
          res.status(201).json({
            data: createdUserMovieId,
            message: 'user movie created'
          });

        }else {
          res.status(201).json({
            message: 'user movie exist'
          });
        }
    
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userMovieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:user-movies']),
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async function(req, res, next) {
      const { userMovieId } = req.params;

      try {
        const deletedUserMovieId = await userMoviesService.deleteUserMovie({
          userMovieId
        });

        res.status(200).json({
          data: deletedUserMovieId,
          message: 'user movie deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = userMoviesApi;