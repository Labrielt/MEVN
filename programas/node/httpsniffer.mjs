import * as util from 'util';
import * as url from  'url';

const timestamp = () => { return new Date().toISOString();}

export function sniffON( server )
{
    server.on( 'request' , ( req , res ) => {
        console.log(`${timestamp()} peticion `);
        console.log( `${timestamp()} ${reqToString(req)}`);
    });

    server.on('close' , errno => {console.log(`${timestamp()} cerrar 
    errno ${errno}`);});

    server.on('checkContinue' , (req ,res) => {
        console.log(`${timestamp()} checkContinue`);
        console.log(`${timestamp()} ${reqToString(req)}`);
        res.writeContinue();
    });

    server.on( 'clientError', () => {console.log('Error del cliente'); });
   // server.on('connection' , e_connection);

}

export function reqToString(req)
{
    var ret = `peticion ${req.method} ${req.httpVersion} ${req.url}` + '\n';
    ret += JSON.stringify(url.parse(req.url ,true)) + '\n';

    var keys = Object.keys(req.headers);

    for ( var i = 0 ,  l = keys.length; i < l ; i++) {
        var key = keys[i];
        ret += `${i} ${key}: ${req.headers[key]} ` + '\n';
    }

    if(req.trailers)
    ret += util.inspect(req.trailers) + '\n';

    return ret;
}