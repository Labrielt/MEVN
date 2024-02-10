// Estandar primera mayuscula singular

const mongoose  = require ( 'mongoose' );
const Esquema   = mongoose.Schema;

var esquemaNombre = new Esquema ( {
    nombre: String,
    apellido: String
});

// http://mongoosejs.com/docs/validation.html

const EsquemaUsuario = new Esquema ( {
    nombre: {
        require : [true , 'Dejenos Conocerlo agregando su Nombre !!!'],
        type: String
       
        // {
        //     nombre: String,
        //     apellido: String
        // }
    },
    email: {
        require :[ true, 'Por favor agrugue su email tambien'],
        type: String
    },

    edad: Number,
    
    telefono: {
        type: String,
        validate : {
            validator: function ( v ){
                return /\d{3}\d{3}-\d{4}/.test( v );
            },
            mensaje: '{VALUE} no es un numero de telefono valido'
        }
    }

});

// crear collecion en la DB
const Usuario   = mongoose.model ( 'Usuario', EsquemaUsuario );
module.exports  = Usuario;






    