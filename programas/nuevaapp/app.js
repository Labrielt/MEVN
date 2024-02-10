var express      = require( 'express'       );
var path         = require( 'path'          );
var favicon      = require( 'serve-favicon' );
var logger       = require( 'morgan'        );
var cookieParser = require( 'cookie-parser' );
var bodyParser   = require( 'body-parser'   );

var routes = require('./routes/index');
const { request } = require('http');

var app = express();

// Configuración de motor de vista
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.use( logger( 'combined' ) );
app.use( favicon( path.join( __dirname, 'public', 'favicon.ico' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( cookieParser( 'abc' ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Enrutamiento
app.use( '/', routes );

app.get( '/busqueda', function( req, res ) {
    console.log( req.query );
    res.end( JSON.stringify( req.query ) + '\r\n' );

} );

app.get( '/params/:rol/:nombre/:estado', function( req, res ) {
    console.log( req.params );
    console.log( req.route  );
    res.end();
} );

app.post( '/body', function (req, res ) {
    console.log( req.body );
    res.end( JSON.stringify( req.body ) + '\r\n' );

} );

app.get( '/cookies', function( req, res ) {
    if( !req.cookies.contador )
        res.cookie( 'contador', 0);
    else
        res.cookie( 'contador',  parseInt(req.cookies.contador ,10 ) + 1 );

    res.status( 200 ).send( 'Las cookies son: ' + JSON.stringify( req.cookies ) );
} );

app.get('/cookiesfirmadas' , function ( req, res ) {
    if ( !req.signedCookies.contador)
        res.cookie('contador' , 0 , { signed: true });
    else
        res.cookie( 'contador' , parseInt ( req.signedCookies.contador , 10 ) + 1 , { signed: true });
    

    res.status ( 200).send ( 'Las Cookies son : ' , req.signedCookies );
});

app.get( '/otrosmetodos' , function ( req , res ){
    req.get( 'Content-Type' );
    req.header( 'content-type' );
   // console.log( req.ip);
   // res.status (200) .send ( req.ip );
   // res.status (200) .send ( req.path ); // ruta actual
   //  res.status (200) .send ( req.host);
    //    res.status (200) .send ( req.protocol);
    //res.status (200) .send ( req.subdomains); // enumera los subdominios
    res.status (200) .send ( req.originalUrl ); // muestra la url original , la que se cargo original mente
      
});

// metodos request
//request.get( 'Content-Type' );
//request.header( 'content-type' );
//console.log( request.accepted );

//Capturar 404 y delegar al manejador de errores
app.use( function( req, res, next ) {
    var err = new Error( 'No encotrado' );
    err.status = 404;

    next( err );
} );

//Manejadores de errores

//Manejador de error de desarrollo 
//Imprimiara la pila
if( app.get( 'env' ) === 'development' ) {
    app.use ( function( err, req, res, next ) {
        res.status( err.estatus || 500 );
        res.render( 'error', {
            mensaje : err.message,
            error   : err
        });
    } );
}

//Manejador de errores de produccion 
//No se filtra la pila de errores al usuario
app.use( function( err, req, next ) { 
    res.status( err.status || 500 );
    res.render( 'error', {
        mensaje : err.message,
        error   : err
    });
} );

module.export = app; 

var debug = require ( 'debug' ) ( 'request' );

app.set( 'port', process.env.PORT || 3000 );

var server = app.listen( app.get( 'port' ), function() {
    debug( 'Express server eescuchando en el puerto '+ 
    server.address() .port );
} );

