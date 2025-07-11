import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formData = {
    email: '',
    password: ''
  };

  submitSignup(form: NgForm) {
    if (form.valid) {
      console.log('Signup Data:', this.formData);
      alert('Account created successfully!');
      form.resetForm();
    } else {
      alert('Please fill all required fields.');
    }
  }
}