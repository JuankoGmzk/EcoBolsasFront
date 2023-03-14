import { Component } from '@angular/core';
import {TaskService} from '../../services/tasks.service';
import {  SocketWebService} from "../../services/socket-web.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  tasks = [{
    _id:'',
    empresa: '',
    fecha_entrega: '',
    fecha: '',
    supervisor: '',
    material: '',
    tipo_bolsa: '',
    cogedera: '',
    color_tela: '',
    medidas: '',
    marcacion: '',
    color_tintas: '',
    cantidad: '',
    description: '', name:'',date:'',NuevaPropiedad:''
  }];
  constructor(private taskService: TaskService, socketWebService:SocketWebService)  
  { 
    socketWebService.outEven.subscribe((res:any) => {
      console.log(res);
      this.taskService.getTasks()
      .subscribe(
        res => {
          for (let prop in res) {
            const fechaActual = new Date();
            const fechaItem = new Date(res[prop].fecha);

            if(fechaItem < fechaActual){
              res[prop].NuevaPropiedad = '1';
            }
            else{
              res[prop].NuevaPropiedad = '0';
            }
          }
          this.tasks = res;
        },
        err => console.log(err)
      )
    })
  }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.taskService.getTasks()
    .subscribe(
      res => {
        for (let prop in res) {
          const fechaActual = new Date();
          const fechaItem = new Date(res[prop].fecha);

          if(fechaItem < fechaActual){
            res[prop].NuevaPropiedad = '1';
          }
          else{
            res[prop].NuevaPropiedad = '0';
          }
        }
        this.tasks = res;
      },
      err => console.log(err) 
    )
  }


  getColor(prod: string): string {
    if (prod == '1') {
      return 'red'; 
    } else {
      return 'green'; 
    }
  }

  EliminarTarea(id:string){
    
    const obj = {
      _id:id
    };

    this.taskService.deleteTaskByid(obj)
    .subscribe(
      res =>{
        this.obtenerPedidos();
      },
      err =>{
        console.log(err)
      }
    )
  }

  EditarTarea(task:any){
    
    this.taskService.updateTaskById(task)
    .subscribe(
      res => {
        this.obtenerPedidos();
      },
      err =>{
        console.log(err)
      }
    );
  }

}
