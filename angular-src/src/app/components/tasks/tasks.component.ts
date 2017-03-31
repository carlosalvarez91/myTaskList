import { Component, OnInit } from '@angular/core';
import {Task} from '../../../task';
import { TaskService} from'../../services/task.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],

  

})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;
  passwordSite: string;
  oldTask;
  appState = 'default';

  constructor(private taskService:TaskService) { 
        this.taskService.getTasks()
        .subscribe(tasks => {
        this.tasks = tasks;
    });
  }

  ngOnInit() {
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
      this.oldTask = task;
     //Scroll up window

    }
    cancel(){
      this.appState = 'default';
      this.title = '';
      this.passwordSite= '';
    }
    updateTask(task){
            for(var i = 0; i < this.tasks.length; i++){
            if (this.tasks[i]._id == this.oldTask._id){
              this.tasks[i].title  = this.title;
              this.tasks[i].passwordSite = this.passwordSite;
              console.log('Updated');
            }
          }
      this.taskService.updateTask(task).subscribe(data =>{
        task.title = '';
        task.passwordSite = '';
      });
    }  
}
