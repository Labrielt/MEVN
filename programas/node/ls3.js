function VParametros(){
    try{
     if(process.argv.length<103){
      for (let i=2;i<process.argv.length;i++){
       console.log(i-1)
      }
     }else{
       console.log("no pongas tantos argumentos");
     }
    }catch(err){
     console.error(err);
    }
   }
   
   
   VParametros();