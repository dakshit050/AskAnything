import { post } from './../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPost(){
    return  this.http.get('http://127.0.0.1:8080/api/posts/');
  }
   savepost(data:post){
     return this.http.post('http://127.0.0.1:8080/api/posts',data);
   }
   getPost(id:Number){
    return this.http.get(`http://127.0.0.1:8080/api/posts/${id}`);
   }
   getAllPostByUser(username:String){
     return this.http.get(`http://127.0.0.1:8080/api/posts/by-user/${username}`);
   }
   getAllPostBycommunity(id:Number){
    return this.http.get(`http://127.0.0.1:8080/api/posts/by-subreddit/${id}`);
   }
}
