import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { PostService } from '../Service/post.service';
import { find, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  listOfComment: Array<any> = [];
  @Input() posts: Array<any> = [];
  @Output() cardEmit: EventEmitter<any> = new EventEmitter();

  constructor(private postService: PostService) { }


  toggleCommentSection(postId: number): void {
    const post = this.posts.find((p) => p.id === postId);
    if (post) {
      post.showCommentSection = !post.showCommentSection;
    }
  }

  addComment(postId: number, post: any, content: string): void {
    if (!content.trim()) return;

    const apiData = {
      id: post.id,
      user_id: post.user_id,
      post_content: content,
      updated_at: post.updated_at ? post.updated_at : post.created_at,
      created_at: post.created_at,
    };
    this.postService.addComment(apiData).subscribe(response => {
      if (response) {
        this.updatePostData()
      }
    })

  }
  updatePostData() {
    this.cardEmit.emit(true)
  }

}
