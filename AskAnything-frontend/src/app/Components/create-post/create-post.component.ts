import { ToastrService } from 'ngx-toastr';
import { PostService } from './../../services/post.service';
import { post } from './../../models/post.model';
import { throwError } from 'rxjs';
import { CreategroupService } from './../../services/creategroup.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { groupModel } from 'src/app/models/groupresponse.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm:FormGroup;
  postmodel:post;
  subgroups:Array<groupModel>=[];
  constructor(private formbuilder:FormBuilder,
              private subgroupservice:CreategroupService,
              private postservice:PostService,
              private toastr:ToastrService) { 
                this.postmodel={
                  postName:'',
                  subredditName:'',
                  url:'',
                  description:''

                }
              }

  ngOnInit(){
    this.getAllgroups();
    this.postForm=this.formbuilder.group({
      postName:['',Validators.required],
      url:[''],
      description:['',Validators.required],
     subGroupName:['',Validators.required]
    });
  }
   getAllgroups(){
     this.subgroupservice.getAllGroup().subscribe(data=>{
      this.subgroups=data;
    },error=>{
      throwError(error);
    });
  }
  discardPost(){  
    this.postForm.reset();
  }
  createPost(){
    this.postmodel.description=this.postForm.get('description').value;
    this.postmodel.url=this.postForm.get('url').value;
    this.postmodel.subredditName=this.postForm.get('subGroupName').value;
    this.postmodel.postName=this.postForm.get('postName').value;
    this.postservice.savepost(this.postmodel).subscribe(data=>{
      this.toastr.success('Post Created','Successful',{
        timeOut:2000,
        progressBar:true,
        progressAnimation:"increasing",
        positionClass:'toast-top-right'
      });
    },error=>{
      throwError(error);
    }
    )
  }
}
