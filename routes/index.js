var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = 'postgres://postgres:postgres@cap-sg-prd-3.integration.ibmcloud.com:17545/postgres';

//Users
//get all users
router.get('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('select * from clientes', function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});
//post user
router.post('/users', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    console.log("connected to database");
    client.query('INSERT INTO clientes(nombre, apellido, rut, saldo) VALUES($1, $2, $3, $4) returning nombre', [req.body.nombre, req.body.apellido, req.body.rut, req.body.saldo], function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      res.send(result);
    });
  });
});

module.exports = router;
