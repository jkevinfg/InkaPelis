const assert = require('assert'); //verfica
const proxyquire = require('proxyquire');
const { moviesMock , MoviesServiceMock} = require('../utils/mocks/movies');
const testServer = require('../utils/testServer');

describe('routes-movies' , function (){
  const route = proxyquire('../routes/movies' , {
    '../services/movies' : MoviesServiceMock
  });

  const request = testServer(route);

  describe('GET /movies', function() {

    it('should respond with status 200', function(done){
      request.get('/api/movies').expect(200,done);
    });

    it('should respond with the list of movies' , function(done) {
      request.get('/api/movies').end((err,res) => {
        assert.deepEqual(res.body , {
          data : moviesMock,
          message : 'movies listed'
        });
        done();
      })
    })



  });
});


/*
mocha : nos ayuda a correr los test
supertest : levanta un servidor temporal
sinon : crea mocks para tests
proxyquire : inyecta los mocks cuando se requieren los paquetes
*/