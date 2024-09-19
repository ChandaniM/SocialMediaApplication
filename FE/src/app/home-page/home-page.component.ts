import { Component } from '@angular/core';
import { PostService } from '../Service/post.service';
import { LoginService } from '../Service/login.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  posts: any[] = [];

  constructor(private postService: PostService , public loginService:LoginService , public userService : UserService) { }

  ngOnInit(): void {
    let id  = JSON.parse(localStorage.getItem('UserData') || '{}')['id'];
    console.log(id)
    this.userService.getAllUserList().subscribe()
    this.postData(id)
    console.log(this.posts)
  }
  logCredentials(credentials:any) {
    console.log(credentials);
    let id  = JSON.parse(localStorage.getItem('UserData') || '{}')['id'];
    console.log(id)
    this.postData(id)
  }
  postData(id:number){
    this.postService.getPosts(id).subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Posts:', this.posts);  // This will correctly show the posts after they are fetched
      },
      error: (err) => console.error('Error fetching posts:', err),
    });
  }
}

