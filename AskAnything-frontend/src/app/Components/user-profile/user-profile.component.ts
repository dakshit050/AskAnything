import { CommentService } from './../../services/comment.service';
import { PostService } from './../../services/post.service';
import { comment } from './../../models/comment.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private commentService: CommentService) { 
      this.name = this.activatedRoute.snapshot.params.name;
      this.postService.getAllPostByUser(this.name).subscribe(data => {
        this.posts = data;
        this.postLength = this.posts.length; 
      });
      this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
        this.comments = data;
         this.commentLength = this.comments.length;
      });
    }

  ngOnInit(): void {
  }

}
