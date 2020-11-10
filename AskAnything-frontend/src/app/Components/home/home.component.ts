import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loader:boolean=true;
  constructor(private postservice:PostService) { }
  posts:any=[];
  ngOnInit(): void {
    this.postservice.getAllPost().subscribe(data=>{
      this.posts=data;
      this.loader=false;
    },error=>{
      console.log(error);
    }
    );
  }

}
