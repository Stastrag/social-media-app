import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getUserIdByJwtToken } from '../../utils';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'First Post', content: 'This is the very first post!'},
  //   {title: 'Another Post', content: 'This is a great post!'},
  //   {title: 'Some Post', content: 'This is spme other post!'},
  // ];

posts : Post[] = [];
private postsSub!: Subscription;

 constructor(
  public postsService: PostsService,
  private router: Router,
  private activatedRoute: ActivatedRoute,
  private snackBar: MatSnackBar) {}
  

  ngOnInit() {
    const currentRoute = this.router.url;
    if (currentRoute === '/home') {
      this.postsService.fetchAllPosts();
    } else {
        const userId = getUserIdByJwtToken()
        if (userId) {
          this.postsService.fetchUserPosts(userId);
      } else {
        this.snackBar.open('You are not authenticated. Please log in.', 'Dismiss', {
          duration: 3000,
        });
      }        
    }
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  countLikes(likes: any): number {
    return Object.keys(likes).length;
  }
  
  likePost(postId: string ) {
    const userId = getUserIdByJwtToken();
    if (userId) {
      this.postsService.likePost(postId, userId).subscribe(
        response => {
          const likedPost = this.posts.find(post => post._id === postId);
          if (likedPost) {
            likedPost.likes = response.likes;
          }
        },
        error => {
          console.log("Unable to like Post")
          this.snackBar.open('Unable to like Post', 'Dismiss', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('You are not authenticated. Please log in.', 'Dismiss', {
        duration: 3000,
      });
    }  
  }


}
