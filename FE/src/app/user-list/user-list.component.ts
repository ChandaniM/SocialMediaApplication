import { Component } from '@angular/core';
interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  searchTerm: string = '';
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Hey there! How are you?',
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Did you check the report?',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Let’s catch up tomorrow!',
    },
    {
      id: 4,
      name: 'Bob Brown',
      avatar: 'https://via.placeholder.com/40',
      lastMessage: 'Can you send me the files?',
    },
  ];
  
  filteredUsers: User[] = [];
  selectedUser: User | null = null;

  ngOnInit() {
    this.filteredUsers = this.users;
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  startConversation(user: User) {
    // Logic to start a conversation with the selected user
    alert(`Starting conversation with ${user.name}`);
  }
}
