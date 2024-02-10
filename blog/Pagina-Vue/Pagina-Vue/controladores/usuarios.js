const Usuario = require('../modelos/Usuario');

const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const { eq } = require('semver');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretorKey = 'estoeslaclavesecreta';

module.exports.controller = (app) => {
    //registrar un usuario
    app.post('/usuarios/registro' , (req , res ) => {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasenha = req.body.contrasenha;
        const nuevoUsuario = new Usuario ({
            nombre,
            email,
            contrasenha,
        });

        Usuario.crearUsuario( nuevoUsuario, (error, usuario) => {
            if ( error ){
                console.error(error);
                res.status(422).json({
                    mensaje: 'Algo Salio Mal. Por favor Intentelo de nuevo mas adelante',
                });
            }
            else res.send( {usuario});
        });
    });

    app.post('/usuarios/login', (req,res) => {
        if (req.body.email && req.body.password ) {
            const email = req.body.email;
            const contrasenha = req.body.contrasenha;
            Usuario.obtenerUsuarioPorEmail ( email , ( err , usuario) => {
                if ( !usuario ){
                    res.status(404).json( {mensaje: 'Usuario no existe'});
                }else{
                    Usuario.compararCOntrasenha(contrasenha, usuario.contrasenha
                        , (error , coincide) => {
                            if (error) throw  error;
                            if( coincide ){
                                const payload = { id: usuario.id };
                                const token = jwt.sign( payload , jwtOptions.secretorKey );
                                res.json({mensaje: 'ok' , token });
                            }else{
                                res.status(401).json({ mensaje: 'La contraseña es incorrecta'});
                            }
                        } );
                }
            })
        }
    });
};