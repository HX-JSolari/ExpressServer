'use strict';

var express = require('express');
var app = express();
var routes = require('./index.js')
module.exports = app; // esto es solo para testear mas facil

// acuerdense de agregar su router o cualquier middleware que necesiten aca
app.use('/', routes.router);



// el condicional es solo para evitar algun problema de tipo EADDRINUSE con mocha watch + supertest + npm test.
if (!module.parent) app.listen(3000);