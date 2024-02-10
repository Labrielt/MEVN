var createError = require('http-errors');
var favicon = require ('serve-favicon');
var fs      = require ( 'fs' );
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require ( 'body-parser');
var logger = require('morgan');

var rutas = require( './routes/index' );
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var rutaImagenGrande = path.join( __dirname, 'archivos', 'image.jpg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(favicon (path.join( __dirname , 'public' , 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);

app.use( '/' , rutas);
//app.use('/users', usersRouter);

app.get ( '/render' , function (req, res) {
   res.render( 'render' ); // 2do  datos , 3ro funcion de callback
});

app.get ( '/render-titulo', function ( req, res ){
   res.render( 'index' , { titulo: 'FullStack 1'} , 
   function (error , html ) { // funcion de callback
    // hacer algo

   } );
});

app.get ( '/locales' , function ( req ,  res ) {
  res.locals = { titulo: 'FullStack 1..' }
  res.render ( 'index' );
});

app.get ( '/set-html' , function (req , res ){
  res.set ( 'Content-Type' , 'text/html' );
  res.end (`
    <html>
      <body>
        <h1> Bienvenido a Conmuta</h1>
      </body>
    </html>
 
  `);
});

app.get( '/set-csv', function ( req , res ){
  var body = `titulo, tags
      Desarrollo web de Pila Completa 1 ,FullStack
      Node.js ,Express.js ,MongoDB, Vue.js
      Javascript, JavaScript`;

      res.set ( { 'Content-Type' : 'text/csv' , 'Content-Lenght' : body.length , 
      'Set-Cookie' : [ 'type-reader' , 'lenguage = javascript' ]} );

      res.end ( body );
});

app.get( '/status' , function ( req , res ) {
    res.status ( 200 ).end();
} );

app.get ( '/send-ok' , function ( req , res ){
    res.status ( 200 ).send ( {mensaje: 'Datos enviados sadisfactoriomente'});
});

app.get ( '/send-err' , function ( req , res ){
  res.status ( 500 ).send ( {mensaje: 'Lo sentimos el servidor se cayo, espere a que alguien lo levante'});
});

app.get ( '/send-buffer' , function ( req , res ){
  res.set( 'Content-Type' , 'text/plain' );
  res.status ( 200 ).send ( new Buffer ( 'Datos en texto que se convertiran en un Buffer'));
});

app.get ( '/json' , function ( req , res ){
  res.status ( 200 ).json ([{ titulo: 'Desarrollo Web Pila Completa 1' , etiquetas: 'FullStack'} ,
                             { titulo: 'Desarrollo Web Pila Completa 2' , etiquetas: 'FullStack'},
                             { titulo: 'Computo en la Nube' , etiquetas: 'CloudComputing'},
                             { titulo: 'Desarrollo en iOS' , etiquetas: 'iOS Development'}   ]);
});

app.get ( '/no-stream1' , function ( req , res ) {
  res.redirect ( '/stream2');
  //var archivo = fs.readFileSync (rutaImagenGrande);
  //res.end ( archivo );
});

//precoz
app.get ( '/no-stream2' , function ( req , res ){
  res.redirect ( '/stream2');
  var archivo = fs.readFile ( rutaImagenGrande , 
    function ( err , data ){
      res.end (data);
   });
});

app.get ( '/stream1' , function ( req , res ){
    var stream = fs.createReadStream ( rutaImagenGrande );
    stream.pipe ( res );
});

app.get ( '/stream2' , function ( req , res ){
  var stream = fs.createReadStream ( rutaImagenGrande );
  stream.on( 'data' , function ( data ){
    res.write ( data );
  } );



  stream.on( 'end' , function ( data ){
    res.end ();
  } );
});
  

  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var debug = require ( 'debug' ) ( 'request' );

app.set( 'port' , process.env.PORT || 3001 );

var server = app.listen ( app.get ( 'port' ) ,function () {
  debug( 'Servidor Express esuchando en el puerto ' + server.address().port);
});
