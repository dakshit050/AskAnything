import { Router } from '@angular/router';
import { SignupService } from './../../services/signup.service';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private postservice:PostService,
              private SpinnerService:NgxSpinnerService,
              private authService:SignupService,
              private routes:Router) { }
  posts:any=[];
  ngOnInit(): void {
    this.SpinnerService.show();
    this.postservice.getAllPost().subscribe(data=>{
      this.posts=data;
      this.SpinnerService.hide();
    },error=>{
      this.authService.DeleteToken();
      this.SpinnerService.hide();
      this.routes.navigateByUrl('/login');
    }
    );
  }

}
