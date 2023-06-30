import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: 'root'})
export class PostsService {
    constructor(private http:HttpClient) {}

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts(){
        return [...this.posts];
    }

    getPostUpdateListener(){
        return this.postUpdated.asObservable();
    }

    addPost(post: any, userId: string): Observable<Post> {
      console.log(post, userId)
      return this.http.post<Post>('http://localhost:3001/post', 
      {
        title: post.title,
        description: post.description,
        userId : userId  
      })
    }

    likePost(postId: string, userId: string): Observable<any>
    {
      return this.http.patch('http://localhost:3001/post/' + postId + '/like',
      {
        userId: userId
      })
    }

    fetchUserPosts(userId: string) {
        this.http.get<any[]>('http://localhost:3001/post/' + userId + '/posts')
          .subscribe(
            response => {
              this.posts = response;
              this.postUpdated.next([...this.posts]);
            },
            error => {
              console.error('Error fetching posts:', error);
            }
          );
      }
      
      fetchAllPosts() {
        this.http.get<any[]>('http://localhost:3001/post/')
          .subscribe(
            response => {
              this.posts = response;
              this.postUpdated.next([...this.posts]);
            },
            error => {
              console.error('Error fetching posts:', error);
            }
          );
      }
}