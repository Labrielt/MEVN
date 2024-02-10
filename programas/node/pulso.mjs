import { Pulsador } from  './pulsador.mjs';

// instaciar un objeto pulsador

const pulsador = new Pulsador();

//funcion de control

pulsador.on('pulso', () => {
    console.log(`${new Date().toISOString()} pulso recibido`);
});

//inicar los pulsos

pulsador.start();