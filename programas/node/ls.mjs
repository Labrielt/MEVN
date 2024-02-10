import { promises as fs } from 'fs'; // tiene que estar en el nivel superior ( no dentro de una funcion )


async function lista_archivos() {
    const archivos = await fs.readdir('.');
    for ( const arch of archivos ) {
        console.log (arch);
    }
}

lista_archivos().catch ( err => {console.error (err)});