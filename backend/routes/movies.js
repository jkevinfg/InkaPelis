const express = require('express');
const MoviesService = require('../services/movies');


// las rutas solo reciben los parametros y se las envian a los servicios

function moviesApi(app){
    const router = express.Router();
    app.use("/api/movies",router);

    const moviesService = new MoviesService();

    //LISTAR
    router.get('/',async function(req,res,next) {

        const {tags} =req.query;

        try{
            const movies = await moviesService.getMovies({tags});
            res.status(200).json({
                data: movies,
                message : 'movies listed'
            })
        }catch(err){
            next(err);
        }
    });

     //Busqueda
     router.get('/:movieId',async function(req,res,next) {
        const {movieId} = req.params;
        try{
            const movies = await moviesService.getMovies({movieId})
            res.status(200).json({
                data: movies,
                message : 'movie retrieved'
            })
        }catch(err){
            next(err);
        }
    });

     //crear
     router.post('/',async function(req,res,next) {
        const {body : movie } = req;
        try{
            const createMovieId = await moviesService.createMovie({movie});
            res.status(201).json({
                data: createMovieId,
                message : 'movies created'
            })
        }catch(err){
            next(err);
        }
    });

    //actualizar
    router.put('/:movieId',async function(req,res,next) {
        const {movieId} = req.params;
        const {body : movie} = req;

        try{
            const updateMovieId = await moviesService.updateMovie({
                movieId,
                movie
            })
            res.status(200).json({
                data: updateMovieId,
                message : 'movie updated'
            })
        }catch(err){
            next(err);
        }
    });
    //eliminar 
    router.delete('/:movieId',async function(req,res,next) {
        const {movieId} = req.params;

        try{
            const deletedMovieId = await moviesService.deleteMovie({movieId});
            res.status(200).json({
                data: deletedMovieId,
                message : 'movies deleted'
            })
        }catch(err){
            next(err);
        }
    });
}

module.exports = moviesApi;

