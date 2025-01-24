import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { User } from '../login/login.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  searchTerm: string = '';
  users: User[] = []
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  userLoginedJson : any = {}
constructor(private route:Router , public userService:UserService){}
  ngOnInit() {
    this.userLoginedJson = JSON.parse(localStorage.getItem('UserData') || '{}')
    console.log(this.userLoginedJson)
    this.userService.getAllUserList().subscribe((value:Array<User>)=>{
      this.users = value.filter(e=>e.id != this.userLoginedJson.id)
      this.filteredUsers = this.users;
    })
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
    console.log(this.selectedUser , "this is selected user")
    this.route.navigate(['chat/'+this.selectedUser['id']])
  }

  startConversation(user: User) {
    // Logic to start a conversation with the selected user
    alert(`Starting conversation with ${user.username}`);
    console.log(user)
    this.route.navigate(['chat/'+user.id])
  }
}
