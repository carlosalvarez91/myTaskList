import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../../Task';
@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent { 
  tasks: Task[];
  title: string;
  passwordSite: string;
  oldTask;
  appState = 'default';
  
  constructor(private taskService:TaskService){
     this.taskService.getTasks()
         .subscribe(tasks => {
            this.tasks = tasks;
    });
  }
      addTask(event){
          event.preventDefault();
          var newTask = {
            title: this.title,
            passwordSite: this.passwordSite
          }
          this.taskService.addTask(newTask)
              .subscribe(task=> {
                this.tasks.push(task);
                this.title = '';
                this.passwordSite = '';
              });
    }
    
    deleteTask(id){
      var tasks = this.tasks;
      if (confirm("ATTENTION, YOU ARE GOING TO DELETE YOUR DATA") == true){
      this.taskService.deleteTask(id).subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < tasks.length; i++){
            if (tasks[i]._id == id){
              tasks.splice(i, 1);
            }
          }
        }
      });
      }else{
        return false;
      }

    }
    editTask(task){
      this.appState = 'edit';
      this.title = task.title;
      this.passwordSite = task.passwordSite;
     // window scroll up 

    }
    cancel(){
      this.appState = 'default';
      this.title = '';
      this.passwordSite= '';
    }
    /*
    updateTask(id){
    for(var i = 0; i < this.tasks.length; i++){
       if (this.tasks[i].id == this.oldTask){
         this.tasks[i].title = this.title;
         this.tasks[i].passwordSite = this.passwordSite;
      }
     }

    }
  

    updateTask(task){
      var _task = {
        _id:task._id,
        title: task.title,
        passwordSite: task.passwordSite
      };
      
      this.taskService.updateTask(_task)
              .subscribe(_task=> {
                this.tasks.push(_task);
                this.title = '';
                this.passwordSite = '';
      });
    }*/
}
