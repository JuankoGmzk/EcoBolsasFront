import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-task',
  templateUrl: './private-task.component.html',
  styleUrls: ['./private-task.component.css']
})
export class PrivateTaskComponent {

  tareaPrivada = {
    name:'',
    description:'',
    date:''
  }


  privateTasks = [ {description: 1, name:'Superman',date:''}];

  constructor(private taskService: TaskService, private router: Router) { }
 
  ngOnInit() {
    this.taskService.getPrivateTasks()
      .subscribe(
        res => this.privateTasks = res,
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/signin']);
            }
          }
        }
      )
  }


  crearPrivadaTarea() {
    this.taskService.createPrivateTask(this.tareaPrivada)
      .subscribe(
        res => {
          console.log(res);
          window.location.reload();
        },
        err => console.log(err)
      )
  }

}
