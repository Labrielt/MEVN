const fs = require('fs').promises;

async function listarArchivos() {
    try {
        let dir = '.';
        
        if (process.argv[2]) dir = process.argv[2];
        
        const archivos = await fs.readdir(dir);

        
        for (let arch of archivos) {
            console.log(arch);
        }

    } catch (err) {
        console.error(err);
    }
}

listarArchivos();