import { post } from './../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
  @Input()posts:any=[];
  constructor(private router:Router) { }
  faComments = faComments;
  ngOnInit(): void {
   
  }
  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
