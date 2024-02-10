import EventEmitter from 'events';


export class Pulsador extends EventEmitter {

    start() {
        var self = this;
        setInterval(()  => {
            console.log ( `${new Date().toISOString()} >>>>>> pulso`);
            this.emit('pulso');
            console.log(`${new Date().toISOString()} <<<<<< pulso \n`);

        },5000);
    }
};

