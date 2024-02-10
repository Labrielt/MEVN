
var express = require('express');
var app = express();
// Variables 

app.set('port',79);
console.log('Express escucha en el puerto ' + app.get('port'));

app.set('variable' , 'Hola Edmundo');
console.log(app.get('variable'));``

// equivalentes 
app.set('aprendiendo' , true );
app.enable('aprendiendo');  // disable para falso

console.log('No Estoy aprendiendo '+ app.disabled('aprendiendo')); // para consultar se usa enabled y disabled

// env 
/* Fase de desarrollo...
 development
 test
 stage
 preview
 production
*/

app.set('env', 'test');
process.env.NODE_ENV='test';
console.log(app.get('env'));


/**** view cache 
 **** view engine           ('ext','jade')
 **** views
 **** trust proxy           Varnish Nginx
 **** jsonp callback name   res.jsonp()
                            callback = updateView
                            cb = updateView
                            app.set('jsonp callback name' , 'cb')

https://en.wikipedia.org/wiki/Cross-origin_resource_sharing

******* case sensitive routing   app.enable( 'case sensitive routing')
******* strict routing          /users
                                /users/
*/
app.get('/users', function (req ,res) {
        res.send('users');
});

app.get('/users/' , function (req ,res){
    res.send( 'users/');
});


/***********
 *      z-powered-by   muestra donde esta hecho el back-end
 * 
 *      etag            (entity tag)  valor defalu true       
 * 
 */

app.set('etag' , function (body , encoding) {
    return customEtag(body,encoding);
});

/****
 *  query parser   
 */


app.set('query parser' , 'simple');
app.set('query parser', false); // lo desactiva , no analiza nombre = valor
app.set('query parser', function(){});// cambiar el analisis de la consulta


/****
 * Entornos
 */


process.env.NODE_ENV

if('development' === process.env.NODE_ENV){
    //conectarse a la base de datos de desarrollo
}else if ('production' === process.env.NODE_ENV){
    //conectarse a la base de datos de produccion
}


// si fuera una variable de express
if( 'development' === app.get('env')){

}else if ( 'produccion' === app.get('env')){

}

/**  MIDDLEWARES
 * 
 * body parser
 * 
 */
var bodyparser = require('body-parser');


app.use(bodyparser.json({
    strict: false,
    reviver: function (key,value){
        if(key.substr(0,1) === '_'){
            return undefined;   
        }else{
            return value;
        }

    },
    limit: 5000
}));

app.use(bodyparser.urlencoded({limit: 10000}));


/**
 * cookie-parser
 * 
 * npm install cookie-parser@1.3.2
 * req.cookie.object
 * 
 * path         la ruta donde se guarda
 * expires      el tiempo en que se expira
 * maxAge       el maximo que dura
 * domain        el  dominio de la cookie
 * secure       https o no
 * httpOnly     sin https
 * 
 * 
 *JSONCookie(string)   analiza la cadena en un formato json
 *JSONCookies(cookies)   como el anterior pero para objetos
 *signedCookie (string , secret)  firma la coookie
 *signedCokkies(cookies, secret)  Como el anterior pero para verias cookies
 */


var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use (cookieParser('esta cadena es un secreto'));


/**
 * express-session
 *       permite al servidor usar algo web
 *      Necesita cookie parser
 * 
 * key      el nombre de la cookie. por default es : connect.sid
 * store    donde se almacena la instancia de la session
 * 
 * secret   se usa para la cookie de session
 * cookie   la ..  {path: '/', httpOnly: true , maxAge: null}
 * 
 * proxy         indica cuando confiar en un proxy invertido
 * saveUninitialized   Unidad sin inicialisar. permite simpre crear una session (u invitado)
 * unset    controla si queremos manterer la session en el store despues de cerrar la session. VALORES (keep, destroy)
 * 
 * resave   Un boolean que fuerza guarar sessiones no modificas ()     default es TRUE
 * rolling  booleano que estblece una nueva cookie en cada peticion el cual resetea la expiracion defalult false
 *          si se activa cada que consulta crea una session.
 * 
 * geid     genera un id de session por default las sessiones en express se almacenan en memoria 
 * 
 * 
 * 
 *   
 */

/**
 * CSURF  
 * Cross-site request forgery(CSRF)  proximamente en pila completa 2 ...
 *      value
 *      cookie
 *      ingnoreMethods      por default se ignora  ['GET' , 'HEAD', 'OPTIONS']
 *      
 */


var crsf = require ('csurf');

app.use(crsf());

/**
 * express.static() (por parte de express) / serve-static (independiente)
 *   servicio de archivos estaticos
 * 
 */

app,use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public')); // puede dar problemas con windows puesto a que usa de separador \ 
app.use(express.static('public')); // ruta relativa


/**
 * connect-timeout
 */

var timeout = require('connect-timeout');

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