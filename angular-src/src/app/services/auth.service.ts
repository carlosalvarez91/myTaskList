import { Injectable } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
   // user: any;

    public token: string;
    public email: string = '';
    public currentUserPassword: string = '';

  constructor(private http:Http) {
    // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.email = currentUser && currentUser.email;
  }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/user/register',user,{headers: headers})
    .map(res => res.json());
  }
  login(email, password): Observable<boolean>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/user/authenticate',JSON.stringify({ email: email, password: password}),{headers: headers})
    .map((response: Response) => {
      let token = response.json() && response.json().token;
      if(token){
        this.token = token;
        this.email = email;
        localStorage.setItem('currentUser', JSON.stringify({ username: email, token: token }));
        return true;
      }else{
        return false;
      }
    });

  }

  getProfile(){
    let headers = new Headers();
    this.authenticated();
    headers.append('Authorization', this.token);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/user/profile',{headers: headers})
    .map(res => res.json());
  }
  /* All this is  inclueded in the login() function, so it's not needed anymore.
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    const user = localStorage.getItem('user');
    this.authToken = token;
    this.user = user;
  }*/
    public authenticated() {
        // Check if there's an unexpired JWT
        return tokenNotExpired(null, this.token);
    };
  /*
  loggedIn(){
    return tokenNotExpired();
  }*/
  logout(): void{
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');

  }

}
