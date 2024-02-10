import * as http from 'http';
import * as util from 'util';
import * as os from 'os';
import { sniffON } from './httpsniffer.mjs';

const listenOn = 'http://localhost:8124';
const server = http.createServer();

server.on('request', (req , res ) => {
    var requrl = new URL(req.url , listenOn);
    
    if (requrl.pathname === "/") paginaInicio( req , res );
    else if ( requrl.pathname === "/osInfo") osInfo( req , res );
    else {
        res.writeHead ( 404 , { 'Content-Type' : 'text/plain'});
        res.end('URL incorecta' + req.url );
    }
});

server.listen( new URL(listenOn).port);
sniffON(server);
console.log(`escuchando a ${listenOn}`);

function paginaInicio ( req , res ) 
{
    res.writeHead( 200 , {'Content-Type' : 'text/html'});
    res.end(`
    <html>
        <head>
            <title> Hola , Raymundo !!! </title>
        </head?>

        <body> 
            <h1> Hola , Edmundo !!! </h1>
            <p> <a href = "/osInfo" > Informacion del sistema operativo </a><p>
        </body>
    </html>`);
}

function osInfo ( req , res )
{
    res.writeHead( 200 , {'Content-Type' : 'text/html'});
    res.end(`
    <html>
        <head> 
            <title> Informacion del Sistema Operativo </title>
        </head?>

        <body> 
            <h1> Informacion del sistema operativo </h1>
            <table  style = " border: 1px solid; ">
                <div style = " border: 1px solid; "
                <tr> <th> Dir TMP </th> <td> ${os.tmpdir()}</td> </tr>
                <tr> <th> Nombre del Host <td> ${os.hostname()}</td> </tr>
                <tr> <th> Tipo de Sistema Operativo </th> <td> ${os.platform()} ${os.arch()}
                    ${os.release()}</td> </tr>
                <tr> <th> Timepo encendido</th> <td> ${os.uptime()}
                    ${util.inspect(os.loadavg())}</td> </tr>
                <tr> <th> Memoria </th> <td> Total : ${os.totalmem()} Libre ${os.freemem}</td> </tr>
                <tr> <th> CPU(s) </th> <td> <pre> ${util.inspect(os.cpus())} </pre> </td> </tr>
                <tr> <th> Red </th> <td> <pre> ${util.inspect(os.networkInterfaces())} </pre></td> </tr>
            </table>
        </body> 
    </html>`); 
}
