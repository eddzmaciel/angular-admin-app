import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

//este tap operator - dispara un efecto secundario para agregar un paso adicional a la funcionalidad
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

//environment configuration
import { environment } from '../../environments/environment';

//interfaces
import { IRegisterForm } from '../interfaces/register-form.interface';
import { ILoginForm } from '../interfaces/login-form.interface';

//models
import { User } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public auth2: any;
  public userProfile: User;

  //este router importado lo estamos usando aqui, solo para este curso!!
  constructor(
    private http: HttpClient,
    private router: Router,
    //este lo utilizamos para manejar instancias  de librerias que se ejecutan  fuera de angular o de manera global
    private ngZone: NgZone
  ) {
    //initialize service
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.userProfile.uid || '';
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //other way to define objectType
  updateUserProfile(data: { email: string; name: string; role: string }) {
    data = {
      ...data,
      role: this.userProfile.role,
    };
    return this.http.put(`${base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  ///////////////////////////////////////////////

  login(formData: ILoginForm) {
    return this.http.post(`${base_url}/login`, formData).pipe(
      /* Tap: action after the call the endpoint, return an observable */
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //login, calling the google auth in the API
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      /* Tap: action after the call the endpoint, return an observable */
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  //define observable that returns a boolean
  //Here we create the user instance and we can have access to the user profile
  //while the user is auth
  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        // tap((resp: any) => {
        map((resp: any) => {
          console.log('---->validateToken resp:', resp);
          //be sure to put the correct order based in the User model
          const { name, email, img = '', google, role, uid } = resp.user;
          //created an instance of the Model User
          this.userProfile = new User(name, email, '', img, google, role, uid);
          console.log('--->this.userProfile:', this.userProfile);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        // if we have response we return true (the token is valid)
        // if not, we throw unauthorized
        // map((resp) => {
        //   console.log('entro aqui!');

        //   return true;
        // }),
        // 'catchError' catch the error that could happen in this request
        // and  'of' allows to create an observable based in the value that you provides
        catchError((error) => of(false))
      );
  }
  //we initialize the googleAuth2 service
  /*
  La diferencia entre una promesa y un observable es que la promesa siempre se va a ejecutar 
  y el observable tienes que suscribirte primero para poder escucharlo
  
  */
  googleInit() {
    console.log('--->usersService (googleInit)');
    return new Promise((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: environment.googleClientId,
          cookiepolicy: 'single_host_origin',
        });
        //cuando hagamos el resolve, es una señal  que el googleInit ya fue inicializado
        resolve(true);
      });
    });
  }

  //logout method
  logout() {
    localStorage.removeItem('token');
    //las funciones normales rompen el this
    //este es el signout de google
    this.auth2.signOut().then(() => {
      console.log('User signed out.');
      //the google library is doing the navigation to '/login', so for that we are using NgZone
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
