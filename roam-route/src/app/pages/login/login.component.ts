import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  submitLogin(form: NgForm) {
    if (form.valid) {
      console.log('Login Data:', this.formData);
      form.resetForm();
      this.router.navigate(['/home']); // Redirect to home page without any popup
    } else {
      alert('Please enter both email and password.');
    }
  }
}