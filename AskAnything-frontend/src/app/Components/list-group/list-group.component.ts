import { groupModel } from './../../models/groupresponse.model';
import { CreategroupService } from './../../services/creategroup.service'
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  groups:any=[];
  constructor(private creategroup:CreategroupService) { }

  ngOnInit(): void {
    this.creategroup.getAllGroup().subscribe(data=>{
    this.groups=data;
    console.log(this.groups[0]);
    },error=>{
      throwError(error);
    });
  }

}
