import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  // email!: string;
  // password!: string;

  ngOnInit(): void {}

  signIn(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.SignIn(
      form.controls.email.value,
      form.controls.password.value
    );

    form.reset();
  }
}
