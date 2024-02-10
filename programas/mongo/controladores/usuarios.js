// estandar minusculas plural
var Usuario = require ( '../modelos/Usuario');

module.exports.controller = ( app ) => {
    //pagina inicial
    app.get ( '/usuarios' , ( req , res ) => {
        
        Usuario.find( {} , 'nombre email' )
        .then( ( error , usuarios ) => {
            if( error ) { 
                console.error (error); 
                res.send ( error );
            }else
                res.end ( usuarios );

        });

    // Usuario.find({}, 'nombre email')
    // .then(function (usuarios) {
    //     res.send(usuarios);
    // })
    // .catch(function (error) {
    //     console.error(error);
    //     res.status(500).send('Error interno del servidor');
    // });


     });

     app.get ( '/usuarios/:id' , ( req , res ) => {
        
        Usuario.findById( req.params.id , 'nombre email' )
            .then( ( error , usuarios ) => {
            if( error ) { 
                console.error (error); 
                res.send ( error );
            }else{
                res.end ( usuario );

            }

            });
        });


    app.post ( '/usuarios' , ( req , res ) => {
        const usuario = new Usuario ( {
            nombre: req.body.nombre,
            email: req.body.email
        });

        usuario.save ()
            .then( function( error , usuario ) {
            if( error ) { 
                console.error (error); 
                res.send ( error );
            }else
                res.end ( usuarios );

        });

        
        });
    
    app.put ( '/usuarios/:id' , ( req , res ) => {
        Usuario.findById ( req.params.id , 'nombre email')
        .then ( function (error , usuario ) {
           if ( error ){
                console.error ( error );
                res.send ( error );
           } else {
                usuario.nombre.nombre   = req.body.nombre.nombre;
                usuario.nombre.apellido = req.body.nombre.apellido;

                usuario.save()
                        .then (  function ( error , usuario ) {
                            if ( error ){
                                console.log ( error );
                                res.send    ( error );
                            }else{
                                res.end ( usuario );
                            }
                        });

           }
        });
    } );

    // eliminar usuario
    app.delete ( '/usuarios/:id' , ( req , res ) => {
        Usuario.deleteOne( {_id: req.params.id })
        .then (( error , usuario ) => {
            if( error ) { 
                console.error (error); 
                res.send ( error );
            }else
                res.end ( { estado : eliminado } );

        });
    });

}