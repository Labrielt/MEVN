
let conteo = 0;
export function siguiente() { return ++conteo;}
function cuadrado () { return Math.pow(conteo , 2);}
export function hola () {
     return 'Hola Edmundo !!!';
    }

export default function () { return conteo;}
export const valor = 42;
export let sinconteo = -1;
export {cuadrado};