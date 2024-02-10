/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//--save se guarda el paquete en el json para que la app sepa que necesita ese paquete
var compression = require('compression');

var e_session = require('express-session');

var app = express();

app.use(compression( { level: 7 } ));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Motores de vistas
app.set('view engine', 'ejs');~
manillars
jade

app.use(logger(':method :url :status :res[content-lenght] :response-time ms - :referrer - :user-agent'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app; */


var express = require('express'),
  path = require('path'),
  fs = require('fs'),
  compression = require('compression'),
  logger = require('morgan'),
  timeout = require('connect-timeout'),
  errorHandler = require('errorhandler'),
  methodOverride = require('method-override'),
  responseTime = require('response-time'), // define el tiempo de respuesta
  favicon = require('serve-favicon'),
  serveIndex = require('serve-index'),
  vhost = require('vhost'),
  busboy = require('connect-busboy');


  var app = express();
  var api = express();
  var web = express();

  app.use(vhost('www.fullstack1.com',web));
  app.use(vhost('api.fullstack.com',api));

  app.set('view cache',true);
  app.set('views',path.join(__dirname, 'views'));
  //app.set('views engine', 'jade');
  app.set('view engine', "html");
  app.engine('html',require('ejs').__express);
  //express.response.render('index');
  //app.engine('swig', require('swig').renderFile);
  app.set('port', process.env.PORT || 3000 ); 
  app.set(compression({threshold: 1}));
  app.use(logger('combined'));
  app.use(methodOverride('_method'));
  app.use(express.static('public'));
  app.use(responseTime(4));
  app.use(favicon(path.join(__dirname,'public','favicon.ico')));
  app.use('/compartido', serveIndex(
     path.join('public','compartido'),
     {'icons': true , 'hidden' : true, 'view' : 'details' } //tiles default de view
  ));
  app.use(express.static('public')); 
  app.use('/upload', busboy({immediate:true}));
  app.use( '/upload', function ( request, response, ) {
    request.busboy.on( 'file', function( fieldname, file, filename, encoding, mimetype ) { 
      file.on( 'data', function ( data ) { 
        fs.writeFile( 'upload' + fieldname + filename, data );
      } );
      
      file.on( 'end',function(  ) {
        console.log( 'Archvio' + filename + ' finalizó' );
      } );

      request.busboy.on( 'finish', function () {
        console.log( 'Busboy finalizó');
        response.status( 201 ).end();
      } );
    } );
  } );

  //rutas

var timeout = require('connect-timeout');

app.delete('/ordenes-compra',function(request,response,next) {
  console.log('La ruta DELETE ha sido disparada');
  response.status(204).end();
});

//const errorHandler = require('errorhandler');


app.get(
    '/slow-request',
    timeout('1s'),
   
    function (request ,response,next) {
        setTimeout(function(){
            if(request.timeout) return false;
            return next();
        }, 999 + Math.round(Math.random()));
    },function(request, response , next) {
        response.send('ok');
    }
);

app.get('/response-time', function(request,response){
  setTimeout(function(){
    response.status(200).end();
  }, 513);
});


app.get('/',function(request,response){
  response.send('Middleware Express');
});

app.get('/compression',function(request, response){
  response.render('index');
});

//Aplicar manejadores de errrores

if(app.get('env') === 'development'){
  app.use(errorHandler());
}
    

//Arrancar el servidor
var server = app.listen(app.get('port'), function(){
  console.log('Servidor Express escuchando en el puerto ' + server.address().port);
});


/*** Motores de vista.
 * jade           https://github.com/jadejs/jade
 * Haml.js        https://github.com/tj/haml.js
 * EJS            https://github.com/tj/ejs 
 * Handlebars.js  https://github.com/donpark/hbs
 * Hogan          https://github.com/tldrio/h4e
 * Combyne.js     https://github.com/tbranyen/combyne.js
 * Siwg           https://github.com/paularmstrong/swig
 * Whiskers       https://github.com/gsf/whiskers.js
 * Blade          https://github.com/bminer/node-blade
 * Haml-Coffee    https://github.com/netzpirat/haml-coffee  
 * Webfiller      https://github.com/haradrudell/webfiller 
 * Pug            https://github.com/pugjs/pug
 */

var usuarios =  {
  'azat': {
    email: 'hi@azat.com',
    website: 'http://azat.com',
    blog: 'http://webapplog.com'
  }, 
  'Marco Antonio': {
    email: 'marcoantonio@azat.com',
    website: 'http://marcoantonio.azat.com',
    blog: 'http://webapplog.com/marcoantonio'
  }
};
/**
 *  Enrutamiento 
 * 
 * app.VERBO(); // metodo de conexion = verbo de conexion.
 * 
 * app.get('/usuarios/', function(request, reponse) {} )
 * app.post('usuarios/' . function(request, reponse) {} )
 */

/** AHHHHHHHHHHHHHHHHHH
 * 
 * @param {String} nombre Nombre a Buscar
 * @param {*} callback Funcion Callback
 * @returns 
 */

var findUserByUsername = function ( nombre, callback ) {
  // Realizar la consulta a la base de datos que llama al callback cuando termina
  // Esta es una base de datos falsa
  if ( !usuarios[ nombre ] )
  return callback( new Error( 
    'No se encontró el usuario ' + nombre
 ) );

 return callback( null, usuarios[ nombre ] );
};

app.get( '/v1/users/:nombre', function ( request, response, next ) {
  var nombre = request.params.nombre;
  findUserByUsername( nombre, function ( error, usuario ) {
    if ( error ) return next ( error );
    return response.render( 'user', { usuario: usuario, nombre: nombre}  );
  });
});

//archivo /nombre 
//directorio /nombre/
app.get('/acercade', function (request,response){
  response.send('Acerca de nuestra pagina');
});

app.get('/api/historias/:id',function(request,response,next){
  //autorizar
  //Si no esta autorizado mostrar error
  //Retornar next ( error )
  //Si esta Autorizado y sin errore
  return next();
}), function(request,response,next){
  // extraer y obtener el objeto desde la base de datos
  // Asumiendo que no hay errores guardarmos la historia en el objeto
  request.historia = historia;
  return next();
} ,function(request,response,next){
  // Salida del resultado de la busqueda en la base de datos
  response.send(response.historia);
};

/**
 * app.all()
 * app.all('*', userAuth );
 * app.all('/api/*', apiAuth );
 * 
 * Class router
 * 
 * var express - require ( 'express' );
 * var router = express.Router ( options );
 * //definir enrutamiento
 * app.use( '/blog', router );
 * 
 * caseSensitive // sensible a mayusculas y minusculas
 * strict  // 
 */

app.get( '/v1/admin/:username', function ( request, response, next) {
  var username = request.params.username;
  findUserByUsername( username, function (error, user) {
    if ( error ) return next ( error );
    
    return response.render( 'admin', {user , username}); // como no se especifica el nombre toma el nombre de la variable
  });
}); 

var express = require('express');
var router = express.Router();

// ... Importaciones y configuraciones 

router.param('postId', function(request,response, next ){
  //encontrar post por ID
  // Guardar post a peticion
  request.post = {
    name: 'PHP vs Node.js',
    url: 'https://webpplog.com/php-vs-node-js'
  };
  return next;
})

router
  .route('/posts/:postId')
  .all(function (request,response,next) {
    // Este sera llamado para peticiones de culaquier metodo HTTP
  })

  .post(function (request,response,next) {
    response.json(request.post);
  })

  .get(function (request,response,next) {
    response.json(request.post);
  })

  .put(function (request,response,next) {
    // ... actualizar el post
    response.json(request.post);
  })

  .delete(function (request,response,next) {
    //.. eliminar el post
    response.json({'mensaje' : 'ok'});
  });

  /***
   * request.query            parametros de la de consulta
   * request.params           parametros URL
   * request.body             Datos del Body pedido
   * request.route            Ruta del enrutamiento
   * request.cookies          Datos de cookies
   * request.signedCookies    Datos de cookies firmadas
   * request.header()         Cabeceras de peticion
   * request.get()            Cabeceras de peticion
   * request.accepts()        (Pendiente)
   */



  