import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getAllCommentsForPost(postId: number){
    return this.http.get('http://localhost:8080/api/comments/by-post/' + postId);
  }

  postComment(commnetmodel: comment) {
    return this.http.post('http://localhost:8080/api/comments/', commnetmodel);
  }

  getAllCommentsByUser(name: string) {
    return this.http.get('http://localhost:8080/api/comments/by-user/' + name);
  }
}
