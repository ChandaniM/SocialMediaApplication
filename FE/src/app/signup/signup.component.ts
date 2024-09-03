import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.name && this.email && this.password) {
      // Perform create account logic here, such as sending a request to a server.
      console.log('Name:', this.name);
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      alert('Account created successfully!');
    }
  }
}
