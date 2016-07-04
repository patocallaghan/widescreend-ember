/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var moviesRouter = express.Router();
  var bodyParser = require('body-parser');
  var Datastore = require('nedb')
    , db = new Datastore({ filename: 'db/movies.db', autoload: true  });

  function generateMovie(id, title, rating, review, date) {
    return {
      "type": "movies",
      "attributes": {
        "title": title,
        "rating": rating,
        "review": review,
        "date-watched": date
      }
    }
  }

  moviesRouter.get('/', function(req, res) {
    db.find({ type: 'movies' }, function (err, docs) {
      res.send(generateJSONAPIResponse(docs));
    });
  });

  function generateJSONAPIResponse(response) {
    return {
      data: response
    };
  }

  moviesRouter.post('/', function(req, res) {
    var savedMovie = req.body.data.attributes;
    var movie = {
      "type": "movies",
      "attributes": {
        "title": savedMovie.title,
        "rating": savedMovie.rating,
        "review": savedMovie.review,
        "date-watched": savedMovie['date-watched']
      }
    };
    db.insert(movie, function (err, movie) {
      res.send(generateJSONAPIResponse(movie))
    });
  });

  moviesRouter.get('/:id', function(req, res) {
    db.findOne({ _id: req.params.id }, function (err, doc) {
      doc = doc ? doc : {}
      res.send(generateJSONAPIResponse(doc));
    });
  });

  moviesRouter.patch('/:id', function(req, res) {
    db.update({ _id: req.params.id }, { $set: { attributes: req.body.data.attributes } }, {}, function() {
      db.findOne({ _id: req.params.id }, function (err, doc) {
        doc = doc ? doc : {}
        res.send(generateJSONAPIResponse(doc));
      });
    });
  });

  moviesRouter.delete('/:id', function(req, res) {
    db.remove({ _id: req.params.id }, function (err, numRemoved) {
      res.status(204).end();
    });
  });

  app.use('/movies', require('body-parser').json({type: 'application/vnd.api+json'}));
  app.use('/movies', moviesRouter);
};
