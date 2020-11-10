import { CreategroupService } from './../../services/creategroup.service';
import { createGroup } from './../../models/group.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-sub-group',
  templateUrl: './create-sub-group.component.html',
  styleUrls: ['./create-sub-group.component.css']
})
export class CreateSubGroupComponent implements OnInit {
  GroupForm:FormGroup;
  createGroup:createGroup;
  constructor(private formbuilder:FormBuilder,
              private router:Router,
              private  creategroupservice:CreategroupService) { 
                this.createGroup={
                  communityName:'',
                  description:''
                }
              }

  ngOnInit(): void {
    this.GroupForm= this.formbuilder.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
  }
Create(){
this.createGroup.communityName=this.GroupForm.get('title').value;
this.createGroup.description=this.GroupForm.get('description').value;
this.creategroupservice.creategroup(this.createGroup).subscribe(data=>{
this.router.navigateByUrl('list-group');
},error=>{
  throwError(error)
  
}
)

}
Discard(){
  this.GroupForm.reset();
}
}