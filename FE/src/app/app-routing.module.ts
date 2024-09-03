import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path : "login", component: LoginComponent },
  { path: 'chat/:id', component: ChatBoxComponent },
  { path: 'createAccount', component: SignupComponent },
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  {path : "chat" , component : UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
