
var express = require('express');
var app = express();
var puerto = 3000;

app.get('*', function(req , res ){
    res.end('Hola Edmundo !!!! ');
});

app.listen(puerto , function () {
    console.log('El servidor esta corriendo , por favor abra su navegador en https://localhost%s', puerto);
});