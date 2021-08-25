import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthenticationService) {}

  signUp(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authService.SignUp(
      form.controls.email.value,
      form.controls.password.value
    );
    form.reset();
  }
}
