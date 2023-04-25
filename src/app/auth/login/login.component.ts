import { Component, OnInit, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { environment } from '../../../environments/environment';

//Services
import { UsersService } from '../../services/users.service';

// ##Start - Google SignIn Old Method (09/12/21)
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private ngZone: NgZone
  ) {}

  public loginForm = this.formBuilder.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false],
  });

  //HostListener Example
  // counter = 0;
  // @HostListener('window:keydown', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   this.counter++;
  // }
  // resetCounter() {
  //   this.counter = 0;
  // }

  //Google SignIn Old Method (09/12/21)
  public auth2: any;

  ngOnInit(): void {
    this.renderButton();
  }

  // ##Start - Google SignIn Old Method (09/12/21)
  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   const googleUserToken = googleUser.getAuthResponse().id_token;
  //   console.log('--->googleUserToken: ', googleUserToken);
  // }

  // onFailure(error) {
  //   console.log(error);
  // }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });
    this.startApp();
  }

  //the Arrow functions doesn't modify the THIS
  startApp = async () => {
    await this.usersService.googleInit();
    //necesitamos inicializar el auth2 con el mismo auth2 que tenemos en el usersService
    this.auth2 = this.usersService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  //we catch the response from the GoogleSignIn
  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        console.log('--->googleUserToken: ', id_token);
        //if we have a successfull response then we navigate to dashboard
        this.usersService.loginGoogle(id_token).subscribe((resp) => {
          /*
          Because this a method from the google library 
          angular loses the control of the lifecycle
          then we need to use the ngZone
          */
          // Navigate to the dashboard
          this.ngZone.run(() => {
            this.router.navigateByUrl('/');
          });
        });
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  // ##End - Google SignIn Old Method (09/12/21)

  login() {
    this.usersService.login(this.loginForm.value).subscribe(
      (resp) => {
        //recordar usuario en local storage
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        // Navigate to the dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        const msg = err.error.msg;
        Swal.fire('Error', msg, 'error');
      }
    );
  }
}
