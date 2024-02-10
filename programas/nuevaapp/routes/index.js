var express = require('express');
var router = express.Router();

/* Pagina de inicio Metodo GET */

router.get ( '/' , function( req , res ){
    res.render ( 'index' , { titulo: 'Express'});

});

module.exports = router;