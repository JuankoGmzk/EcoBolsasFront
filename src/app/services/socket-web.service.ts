import { EventEmitter, Injectable, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {


  @Output() outEven: EventEmitter<any> = new EventEmitter();
  constructor(

  ) {
    super({
      url: 'http://localhost:4000',
      options: {
        query: {
          nameRoom: ''
        },
      }
    })
    this.listen();
    this.OtsGeneradas();
  }

  listen = () => {
    this.ioSocket.on('evento', (res:any) => this.outEven.emit(res));   

  }
  OtsGeneradas = () => {
    this.ioSocket.on('oTsGeneradas',(res:any) =>  this.outEven.emit(res))
  }

  emitEventBack = (payload = {}) => {
    this.ioSocket.emit('oTsGeneradasBack',payload)
  };

  emitEvent = (payload = {}) => {
    this.ioSocket.emit('chat:message', payload)
 
  }
}











// import { Injectable, EventEmitter, Output } from '@angular/core';
// import { Router } from '@angular/router';
// import { Socket } from 'ngx-socket-io';
// import { io } from 'socket.io-client';

// export const environment = {  
//   production: false,  
//   SOCKET_ENDPOINT: 'http://localhost:4000'
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class SocketioService {

//   socket:any;

//   @Output() outEven: EventEmitter<any> = new EventEmitter();
//   constructor() { }

//   setupSocketConnection() {
//     this.socket = io(environment.SOCKET_ENDPOINT);
//   }

 
//   enviarDatoSocket(datoFalso:any){

//     this.socket.emit('chat:message',{
//       message: datoFalso.name,
//       username: datoFalso.description
//     });
    
//   }


//   emitEvent = (payload = {}) => {
//     this.socket.emit('evento', payload)
//   }

//   listen = () => {
//     this.socket.on('my broadcast', (data: string) => {
//       console.log(data);
//     });
  
//   }
  


// }



