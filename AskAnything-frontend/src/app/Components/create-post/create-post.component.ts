import { SignupService } from './../../services/signup.service';
import { Router } from '@angular/router';
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
              private authService:SignupService,
              private router:Router) { 
                this.postmodel={
                  postName:'',
                  communityName:'',
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
      this.authService.DeleteToken();
      this.router.navigateByUrl('/login');
      throwError(error);
    });
  }
  discardPost(){  
    this.postForm.reset();
  }
  createPost(){
    this.postmodel.description=this.postForm.get('description').value;
    this.postmodel.url=this.postForm.get('url').value;
    this.postmodel.communityName=this.postForm.get('subGroupName').value;
    this.postmodel.postName=this.postForm.get('postName').value;
    this.postservice.savepost(this.postmodel).subscribe(data=>{
      this.router.navigateByUrl('');
    },error=>{
      throwError(error);
    }
    )
  }
}
