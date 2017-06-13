import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error='';

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService
              ) { }

  ngOnInit() {
    // set register data in model
        this.model.email = this.authService.email;
        this.model.password = this.authService.currentUserPassword;
        this.authService.currentUserPassword = '';
    //reset login status
        this.authService.logout();
  }

    login() {
        this.loading = true;
        this.authService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.flashMessage.show('you are now logged in', {
                     cssClass: 'alert-success',
                      timeout: 5000});
                     this.router.navigate(['tasks']);
                } else {
                  // login failed
                    this.flashMessage.show('Username of password is incorrect', {
                     cssClass: 'alert-danger',
                      timeout: 5000});
                     this.router.navigate(['login']);
                }
            });
/*  All this is not needed anymore
onLoginSubmit(){
   const user = {
     username: this.username,
     password: this.password
   }
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        console.log('success');
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('you are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
          this.router.navigate(['tasks']);
      }else{
        console.log('not success');
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['login']);
      }
 });
*/
 }

}
