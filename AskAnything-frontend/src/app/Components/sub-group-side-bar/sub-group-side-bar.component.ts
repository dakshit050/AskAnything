import { CreategroupService } from './../../services/creategroup.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-group-side-bar',
  templateUrl: './sub-group-side-bar.component.html',
  styleUrls: ['./sub-group-side-bar.component.css']
})
export class SubGroupSideBarComponent implements OnInit {
  viewAll:boolean;
  subgroup:any=[];
  constructor(private groupservice:CreategroupService) { 
    this.groupservice.getAllGroup().subscribe(data=>{
      console.log(data);
      if(data.length>4){
        this.subgroup=data.splice(0,4);
        this.viewAll=true;
      }else{
        this.subgroup=data;
      }
    })
  }

  ngOnInit(): void {
  }

}
