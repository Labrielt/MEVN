const fs = require('fs').promises;

async function listarArchivos() {
    try {
        let dir = '.';
        let i = 1;
        
        if (process.argv[2]) dir = process.argv[2];
        
        const archivos = await fs.readdir(dir);
        const lim  = archivos.slice(0,100)
        
        for (let arch of archivos) {
            console.log( i + ' ' +arch);
            i++;
        }

    } catch (err) {
        console.error(err);
    }
}

listarArchivos();