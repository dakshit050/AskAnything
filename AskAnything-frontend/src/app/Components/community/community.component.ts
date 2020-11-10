import { CreategroupService } from './../../services/creategroup.service';
import { throwError } from 'rxjs';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
              private communityservice:CreategroupService ) { 
                this.id=this.activatedRoutes.snapshot.params.id;
                this.communityservice.gergroupbyid(this.id).subscribe(data=>{
                  this.community=data;
                },error=>{
                  throwError(error);
                });
                this.postservice.getAllPostBycommunity(this.id).subscribe(data=>{
                  this.posts=data;
                },error=>{
                  throwError(error);
                });
              }

  ngOnInit(): void {
  }

}
