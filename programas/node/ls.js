const fs = require('fs').promises;
async function listarArchivos() {
    try {
        const archivos = await fs.readdir('.');
        for (const archivo of archivos ){
            console.log(archivo);
        }
    }catch(err){
        console.log(err);
    }
}

listarArchivos();