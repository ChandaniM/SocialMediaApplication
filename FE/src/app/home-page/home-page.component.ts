import { Component } from '@angular/core';
import { PostService } from '../Service/post.service';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  posts: any[] = [];

  constructor(private postService: PostService , public loginService:LoginService) { }

  ngOnInit(): void {
    // this.postService.getPosts().subscribe((posts) => {
    //   this.posts = posts;
    // });
  }
}
