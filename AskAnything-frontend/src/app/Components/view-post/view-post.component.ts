import { CommentService } from './../../services/comment.service';
import { throwError } from 'rxjs';
import { PostService } from './../../services/post.service';
import { comment } from './../../models/comment.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  commentForm:FormGroup;
  postId: number;
  commentmodel:comment;
  post:any;
  comments:any=[];
  constructor(private formBuilder:FormBuilder,
              private activateroute:ActivatedRoute,
              private postservice:PostService,
              private commentservice:CommentService) {
                this.postId=this.activateroute.snapshot.params.id;
                this.commentForm=this.formBuilder.group({
                  text: ['',Validators.required]
                });
                this.commentmodel={
                  text:'',
                  postId:this.postId
                }
   }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }
  private getPostById() {
    this.postservice.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentservice.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  postComment(){
    this.commentmodel.text=this.commentForm.get('text').value;
    this.commentservice.postComment(this.commentmodel).subscribe(data=>{
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    },error=>{
      throwError(error);
    });
  }
}
