import { environment } from './../../environments/environment.prod';
import { post } from './../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllPost(){
    return  this.http.get(this.baseUrl+'api/posts/');
  }
   savepost(data:post){
     return this.http.post(this.baseUrl+'api/posts',data);
   }
   getPost(id:Number){
    return this.http.get(this.baseUrl+`api/posts/${id}`);
   }
   getAllPostByUser(username:String){
     return this.http.get(this.baseUrl+`api/posts/by-user/${username}`);
   }
   getAllPostBycommunity(id:Number){
    return this.http.get(this.baseUrl+`api/posts/by-community/${id}`);
   }
}
