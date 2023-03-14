import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
 
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL = 'http://localhost:4000/api';
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any>(this.URL + '/tasks');
  }

  getPrivateTasks() {
    return this.http.get<any>(this.URL + '/private-tasks');
  }
  createTask(tarea:any){
    return this.http.post<any>(this.URL + '/createTask', tarea);
  } 

  createPrivateTask(privateTask:any){
    return this.http.post<any>(this.URL + '/createPrivateTask', privateTask);
  } 

  updateTaskById(tarea:object){
    console.log("Verga entra care monda ",tarea)
    return this.http.put<any>(this.URL + '/updateTask', tarea);
  } 

  deleteTaskByid(_id:any){
    return this.http.post<any>(this.URL + '/deleteTaksByid',_id);
  }
}