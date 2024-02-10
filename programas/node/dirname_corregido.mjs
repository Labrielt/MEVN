 import { fileURLToPath} from 'url';
 import { dirname } from 'path';

 console.log( `import.meta.url: ${import.meta.url}`);
 
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname( __filename );

 console.log( `Dirname: ${__dirname}`);
 console.log( `Filename: ${__filename}`);

