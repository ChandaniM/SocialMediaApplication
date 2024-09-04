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
    this.userService.getAllUserList().subscribe()
    // this.postService.getPosts().subscribe((posts) => {
    //   this.posts = posts;
    // });
  }
}
