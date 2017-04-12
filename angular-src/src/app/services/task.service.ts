import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './../services/auth.service';

@Injectable()
export class TaskService{
    constructor(private http:Http, private authService: AuthService){
        console.log('Task Service Initialized...');
    }
    getTasks(){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( 'Authorization', this.authService.token );
        return this.http.get('http://localhost:3000/user/tasks', {headers: headers})
        .map(res => res.json());
    }
    addTask(newTask){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append( 'Authorization', this.authService.token );
        return this.http.post('http://localhost:3000/user/task', JSON.stringify(newTask), {headers:headers})
        .map(res => res.json());
    }
    deleteTask(id){
        var headers = new Headers();
        headers.append( 'Authorization', this.authService.token );
        return this.http.delete('/user/task/'+id, {headers: headers})
        .map(res => res.json());
    }
    updateTask(task){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', this.authService.token);
        return this.http.put('http://localhost:3000/user/task/'+task._id, JSON.stringify(task), {headers:headers})
             .map(res => res.json());
    }
}