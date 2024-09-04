import { Component } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
constructor(public loginService:LoginService , public route:Router){}
  onSubmit() {
    if (this.name && this.email && this.password) {
      this.loginService.register(this.name,this.email , this.password).subscribe((response)=>{
        console.log(response)
        alert('Account created successfully!');
        this.route.navigate(['/login'])
      })
    }
  }
}
