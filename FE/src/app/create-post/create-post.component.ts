import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  nameOfUsers : string = '';
  postContent: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  cancelPost(){}
  onImageUploadClick(){}
  openOptions(){}
  onFileSelected(event:any){}
  submitPost(){}
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
