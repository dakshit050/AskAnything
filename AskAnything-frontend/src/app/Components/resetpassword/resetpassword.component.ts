import { ActivatedRoute } from '@angular/router';
import { SignupService } from './../../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { passwordReset } from './../../models/password.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetpassword:FormGroup;
  passwordReset:passwordReset;
  constructor(private formBuilder:FormBuilder,
              private toster:ToastrService,
              private userservice:SignupService,
             private activatedRoutes:ActivatedRoute,

    ) { 
    this.passwordReset={
      token:this.activatedRoutes.snapshot.params.token,
      password:''
    }
  }

  ngOnInit(): void {
    this.resetpassword=this.formBuilder.group({
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    });
  }
  reset(){
    if(this.resetpassword.get('password').value===(this.resetpassword.get('confirmpassword').value)){
      this.passwordReset.password=this.resetpassword.get('password').value;
      this.userservice.updatepassword(this.passwordReset).subscribe(data=>{
        this.toster.success('Password Updated successfully','password changed',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      },err=>{
        this.toster.error(`${err.error.message}`,'Error',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      })
    }else{
      this.toster.error('Password Not Matched','Error',{
        timeOut:2000,
        progressBar:true,
        progressAnimation:"increasing",
        positionClass:'toast-top-right'
      });
    }
  }
}
