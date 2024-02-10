
const fs = require('fs');

const fs_readdir = dir => {
    return new Promise((resolve, reject) => {
        fs.readdir( dir , (err , listaArchivos) => {
            if (err) reject(err);
            else resolve(listaArchivos);
        });
    });
};

async function listaArchivos() {
    try {
        let dir = '.';
        if (process.argv[2]) dir = process.argv[2];
        const archivos = await fs_readdir(dir);

        for( let arch of archivos){
            console.log(arch);
        }
    }
    catch (err){ console.error(err); }
}

listaArchivos();