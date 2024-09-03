import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email && this.password) {
      // Perform login logic here, such as sending a request to a server.
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      alert('Login successful!');
    }
  }
}
