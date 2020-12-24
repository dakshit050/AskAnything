import { groupModel } from './../../models/groupresponse.model';
import { CreategroupService } from './../../services/creategroup.service'
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {
  groups:any=[];
  constructor(private creategroup:CreategroupService,
              private SpinnerService:NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.creategroup.getAllGroup().subscribe(data=>{
    this.groups=data;
    this.SpinnerService.hide();
    },error=>{
      this.SpinnerService.hide();
      throwError(error);
    });
  }

}
