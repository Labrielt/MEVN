let resultado = parseInt(process.argv[2] ,10);
let cadena = process.argv[2];
let sig = 0;
            for (let i=3;i<process.argv.length;i++){
                sig = parseInt(process.argv[i+1] ,10);
                cadena = cadena +' '+ process.argv[i] ;
                if ( i % 2 != 0 ){ 
                switch (process.argv[i]) {
                    case '-':
                         resultado = resultado - sig ;
                         
                        break;
                    case '+':
                         resultado = resultado + sig ;
                         
                     break;
                
                    case '*':
                        resultado = resultado * sig  ;
                    break; 
                
                    case '/':
                         resultado = resultado / sig ;
                     break;
                
                    default:
                        break;
                }}
            }


console.log( cadena + ' = ' + resultado );
