import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { PostService } from '../Service/post.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface PostData {
  user_id: string;
  post_content: string;
  media_type: string;
  created_at: string;
  likes_count: number;
  [key: string]: any; // This line allows dynamic property access
}

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  nameOfUsers: string = '';
  postContent: string = '';
  selectedFile: File | null = null; // Store the selected file
  imagePreview: string | ArrayBuffer | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('options') optionsTemplate!: TemplateRef<any>;

  constructor(
    private postService: PostService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {}

  cancelPost() {
    this.route.navigate(['home-page']);
  }

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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Get the selected file
      console.log(this.selectedFile)
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result ?? null; // Use optional chaining and a fallback to handle undefined
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      console.log(this.selectedFile)
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Call the service to upload the image
    } else {
      console.error('No file selected');
    }
  }
  submitPost() {
    let date = new Date();
    const userId = JSON.parse(localStorage.getItem('UserData') || '{}')['id'];
    
    if (userId) {
      const formData = new FormData();
      
      // Append post content and other data
      const postData :PostData = {
        user_id: userId,
        post_content: this.postContent,
        media_type: this.selectedFile ? 'media' : 'text',
        created_at: this.formatDate(date),
        likes_count: 0,
      };

      for (const key in postData) {
        if (postData.hasOwnProperty(key)) {
          formData.append(key, postData[key]);
        }
      }

      // If a file was selected, append it to the FormData object
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      // Send the combined FormData with both post and file
      this.postService.uploadPost(formData).subscribe(
        (response) => {
          console.log('Upload successful:', response);
          this.route.navigate(['home-page']);
          // Optionally, show a success message
        },
        (error) => {
          console.error('Upload failed:', error);
          // Handle error (e.g., show an error message)
        }
      );

      // Reset post content and selected file after submission
      this.postContent = '';
      this.selectedFile = null;
      this.imagePreview = null; // Reset the preview if needed
    } else {
      console.error('User ID not found');
    }
  }

  // submitPost() {
  //   if(this.imagePreview){
  //     console.log(this.imagePreview)
  //     this.uploadImage()
  //     // this.postService.getImage()
  //   }
  //   let date = new Date();
  //  if (this.postContent.trim()) {
  //     const postData = {
  //       user_id: JSON.parse(localStorage.getItem('UserData') || '{}')['id'],
  //       post_content: this.postContent,
  //       media_type: 'text',
  //       created_at: this.formatDate(date),
  //       likes_count: 0,
  //     };
  //     console.log(postData);
  //     if (postData.user_id != '') {
  //       this.postService.addPost(postData).subscribe((data) => {
  //         console.log(data);
  //         alert(data['message']);
  //         this.postContent = '';
  //         this.route.navigate(['/home-page']);
  //       });
  //     }
  //   }
  // }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
