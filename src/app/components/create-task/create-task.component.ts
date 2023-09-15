import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { TaskService } from "../../services/tasks.service";
import { SocketWebService } from "../../services/socket-web.service";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  tasks = [{
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
    cantidad: ''
  }];
  tarea = {

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
    cantidad: ''
  }

  constructor(
    private router: Router,
    private taskService: TaskService,
    private socketioService: SocketWebService
  ) {  }

  ngOnInit() {
  }

  
  crearTarea() {
    this.taskService.createTask(this.tarea)
      .subscribe(
        res => {
          console.log(res);
          this.socketioService.emitEvent(this.tarea);
          this.router.navigate(['/tasks']); 
        },
        err => console.log(err)
      )
  }

}
