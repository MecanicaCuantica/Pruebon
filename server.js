const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist/PROYECTO2_ANGULAR'));

app.get('/*',(req,res) =>
res.sendFile(index.html, {root: 'dist/angular-heroku/'}),
);

app.listen(proces.env.PORT || 8080);
/* hola */