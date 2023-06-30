import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  selectedImage: File | null = null;
  
  constructor(public postsService: PostsService, private snackBar: MatSnackBar) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const token = localStorage.getItem('userToken');
    if (token) {
      const tokenPayload = jwt_decode(token) as { id: string};
      const userId = tokenPayload.id;
      this.postsService.addPost(form.value, userId)
        .subscribe(
          (response) => {
            console.log('Post added successfully:', response);
            form.resetForm();
            window.location.reload();
          },
          (error) => {
            console.error('Error adding post:', error);
            this.snackBar.open('Error adding post: ' + error.error.message, 'Dismiss', {
              duration: 3000
            })
          }
        );
    } else {
      this.snackBar.open('You are not authenticated. Please log in.', 'Dismiss', {
        duration: 3000, 
      });
    }    
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }
}

