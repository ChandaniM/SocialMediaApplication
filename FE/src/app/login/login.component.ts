import { Component } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';
export interface LoginResponse {
  user: User;
  message: string;
  isLoginIn: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(public loginService: LoginService, private route: Router) { }

  onSubmit() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe((response: LoginResponse) => {
        if (response.isLoginIn) {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('UserData', JSON.stringify(response.user));
          this.loginService.islogin();
          alert('Login successful!');
          this.route.navigate(['/homepage'])

        } else {
          localStorage.setItem('isLoggedIn', "false")
          alert('Login failed!');
          this.loginService.islogout()

        }
      }, error => {
        this.loginService.islogout()
        console.error('Login error:', error);
        alert('Login failed!');
      });
    }
  }
}
