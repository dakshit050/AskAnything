import { CreategroupService } from './../../services/creategroup.service';
import { throwError } from 'rxjs';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  posts:any=[];
  community:any;
  id:Number;
  constructor(private postservice:PostService,
              private activatedRoutes:ActivatedRoute,
              private communityservice:CreategroupService,
              private SpinnerService:NgxSpinnerService) { 
                this.SpinnerService.show();
                this.id=this.activatedRoutes.snapshot.params.id;
                this.communityservice.gergroupbyid(this.id).subscribe(data=>{
                  this.community=data;
                },error=>{
                  this.SpinnerService.hide();
                  throwError(error);
                });
                this.postservice.getAllPostBycommunity(this.id).subscribe(data=>{
                  this.posts=data;
                  this.SpinnerService.hide();
                },error=>{
                  this.SpinnerService.hide();
                  throwError(error);
                });
              }

  ngOnInit(): void {
  }

}
