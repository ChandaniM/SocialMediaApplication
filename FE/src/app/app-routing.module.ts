import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  { path : "login", component: LoginComponent },
  { path: 'chat/:id', component: ChatBoxComponent },
  { path: 'create-account', component: SignupComponent },
  {path:'addPost',component:CreatePostComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  {path : "chat" , component : UserListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
