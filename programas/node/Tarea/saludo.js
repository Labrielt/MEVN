const ahora = new Date();
const hora =  ahora.getHours();
let cadena = process.argv[2];

for (let i=3;i<process.argv.length;i++)
    cadena = cadena +' '+ process.argv[i] ;

if (hora < 12 && hora > 3)
    cadena = 'Buenos dias '+ cadena;

if (hora < 19 && hora >= 12 )
    cadena = 'Buenas Tardes '+ cadena;

if ((hora <= 24 && hora >= 19) || hora < 4)
    cadena = 'Buenas Noches '+ cadena;



console.log(cadena);
