import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { PostService } from '../Service/post.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  nameOfUsers: string = '';
  postContent: string = '';
  imagePreview: string | ArrayBuffer | null = null;
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('options') optionsTemplate!: TemplateRef<any>;
  
  constructor(private postService: PostService, private route: Router,private snackBar: MatSnackBar) {}
  cancelPost() {}
  onImageUploadClick() {
    
    this.fileInput.nativeElement.click();
  }
  openOptions() {
    this.snackBar.openFromTemplate(this.optionsTemplate, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  onFileSelected(event: any) {
    console.log(event , "hdie")
    const input = event.target as HTMLInputElement;
    this.imagePreview = input.value;
  }
  submitPost() {
    let date = new Date();
    let createdDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    if (this.postContent.trim()) {
      const postData = {
        user_id: JSON.parse(localStorage.getItem('UserData') || '{}')['id'],
        post_content: this.postContent,
        media_type: 'text',
        created_at: createdDate,
        likes_count: 0,
        comments_count: 0,
      };
      console.log(postData);
      if (postData.user_id != '') {
        this.postService.addPost(postData).subscribe((data) => {
          console.log(data);
          alert(data['message']);
          this.postContent = '';
          this.route.navigate(['/home-page']);
        });
      }
    }
  }
  addMedia() {
    console.log('Add Media');
    // Logic to handle adding media
  }

  addPoll() {
    console.log('Add Poll');
    // Logic to handle adding a poll
  }

  addDocument() {
    console.log('Add Document');
    // Logic to handle adding a document
  }

  addVideo() {
    console.log('Add Video');
    // Logic to handle adding a video
  }
}
