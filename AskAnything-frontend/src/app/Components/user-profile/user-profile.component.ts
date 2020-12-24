import { SignupService } from './../../services/signup.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommentService } from './../../services/comment.service';
import { PostService } from './../../services/post.service';
import { comment } from './../../models/comment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts:any=[];
  comments:any=[];
  postLength: number=0;
  commentLength: number=0;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService, private SpinnerService:NgxSpinnerService,
    private authService:SignupService,private routes:Router) { 
      this.name = this.activatedRoute.snapshot.params.name;
      this.SpinnerService.show();
      this.postService.getAllPostByUser(this.name).subscribe(data => {
        this.posts = data;
        this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
          this.comments = data;
           this.commentLength = this.comments.length;
           this.SpinnerService.hide();
        },err=>{
          if(err.error.status==403){
            this.authService.DeleteToken();
            this.SpinnerService.hide();
            this.routes.navigateByUrl('/login');
          }
          console.log(err);
          this.SpinnerService.hide();
        });
       
      },err=>{
        this.SpinnerService.hide();
      });
      this.postLength = this.posts.length; 
    }

  ngOnInit(): void {
  }

}
