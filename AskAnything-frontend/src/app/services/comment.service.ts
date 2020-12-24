import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl= environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllCommentsForPost(postId: number){
    return this.http.get(this.baseUrl+'api/comments/by-post/' + postId);
  }

  postComment(commnetmodel: comment) {
    return this.http.post(this.baseUrl+'api/comments/', commnetmodel);
  }

  getAllCommentsByUser(name: string) {
    return this.http.get(this.baseUrl+'api/comments/by-user/' + name);
  }
}
