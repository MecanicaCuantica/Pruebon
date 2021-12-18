const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/PROYECTO2_ANGULAR'));

app.get('/*',function(req,res) {
res.sendFile(path.join(__dirname + '/dist/acme-veterinaria/index.html')); });


app.listen(proces.env.PORT || 8080);
/* hola */