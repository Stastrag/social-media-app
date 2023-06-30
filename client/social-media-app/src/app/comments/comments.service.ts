import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommentsService {
    constructor(private http:HttpClient) {}

    private comments: Comment[] = [];
    private commentsUpdated = new Subject<Comment[]>();
    
    fetchCommentsByPostId(postId: string) {
        return this.http.get('http://localhost:3001/comment/' + postId);
    }
}