import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//External  dependences
import Swal from 'sweetalert2';

//Services
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted = false;

  public registerForm = this.formBuilder.group(
    {
      //default values just for testing
      name: ['Edson Maciel', [Validators.required, Validators.minLength(3)]],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: [
        '123455',
        [Validators.required, Validators.minLength(3)],
      ],
      terms: [true, [Validators.required]],
    },
    //custom validators
    { validators: this.inputsMatch('password', 'passwordConfirm') }
  );

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  invalidFieldMessage = (fieldName: string): boolean =>
    this.registerForm.get(fieldName).invalid && this.formSubmitted
      ? true
      : false;

  invalidPasswords() {
    const password = this.registerForm.get('password').value;
    const passwordConfirm = this.registerForm.get('passwordConfirm').value;

    if (password !== passwordConfirm && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  termsAccepted = () =>
    !this.registerForm.get('terms').value && this.formSubmitted;

  //TODO: we also can create a separate service
  inputsMatch(firstInput: string, secondInput: string) {
    // we need to return a function to be executed in the formFroup
    // make the reference
    return (formGroup: FormGroup) => {
      //extracting the reference for each inputName
      const firstInputReference = formGroup.get(firstInput);
      const secondInputReference = formGroup.get(secondInput);
      //comparing the values for each input
      if (firstInputReference.value === secondInputReference.value) {
        // setting the  error in the input
        secondInputReference.setErrors(null);
      } else {
        //if the values are not equal, set the error object
        secondInputReference.setErrors({
          //both Inputs have different values
          differentOfPassword: true,
        });
      }
    };
  }

  createUser() {
    this.formSubmitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    // posting information
    this.usersService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        // Navigate to the dashboard
        this.router.navigateByUrl('/');
        Swal.fire('Success', 'User created successfully', 'success');
      },
      (err) => {
        console.warn('--->error', err);
        const msg = err.error.msg;
        Swal.fire('Error', msg, 'error');
      }
    );
  }
}
