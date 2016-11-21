var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/sigma';


router.get('/', function(req,res){
  console.log('Made it to treats.js get!');
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM treats', function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });

  });
});

router.get('/:query', function(req, res) {
  console.log('completion get working!');
  query = req.params.query;
  console.log(query);

  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'SELECT * FROM treats WHERE name = $1',
      [query],
      function(err, result) {
        done();
        console.log(result.rows);

        if(err) {
          console.log('select query error: ', err);
          res.sendStatus(500);
        }
        res.send(result.rows);

    });

  });
});

router.post('/', function(req, res){
  console.log('Made it to treats.js post!');
  var treat = req.body;
  console.log(treat);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    console.log('TREAT', treat);

    client.query(
      'INSERT INTO treats (name, description, pic ) ' +
      'VALUES ($1, $2, $3)',

      [treat.name, treat.description, treat.url],
      function(err, result) {
        done();

        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });

  });
});

router.delete('/:id', function(req, res) {
  treatID = req.params.id;

  console.log('task id to delete: ', treatID);
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }

    client.query(
      'DELETE FROM treats WHERE id = $1',
      [treatID],
      function(err, result) {
        done();

        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    });

});

module.exports = router;
