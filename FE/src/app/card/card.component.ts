import { Component, Input } from '@angular/core';
import { PostService } from '../Service/post.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

@Input() posts : Array<any> =[];
  constructor(public postService : PostService){

  }
  toggleCommentSection(postId: number) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.showCommentSection = !post.showCommentSection;
    }
  }
  addComment(postId: number, post: any) {
    if (post.newComment) {
      const apiData = {
        "post_id": postId,
        "comment_text": post.newComment
      };

      this.postService.addComment(apiData).subscribe((response) => {
        console.log('Comment added:', response);
        // Update the comments count and clear the input
        post.comments_count += 1;
        post.newComment = ''; // Clear the input field
        post.comments.push({ text: apiData.comment_text }); // Assuming the response contains the new comment
      });
    }
  }

}
