import { email } from './../../models/password.model';
import { SignupService } from './../../services/signup.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  ForgotPasswordForm:FormGroup;
  Email:email;
  constructor( private formbuilder:FormBuilder,
                private toaster:ToastrService,
                private userservice:SignupService) {
                  this.Email={
                    email:''
                  }
                 }

  ngOnInit(): void {
    this.ForgotPasswordForm=this.formbuilder.group({
      email:['',Validators.required]
    })
  }
submit(){
  this.Email.email=this.ForgotPasswordForm.get('email').value;
  this.userservice.requestpasswordrest(this.Email).subscribe(data=>{
    this.toaster.success('Please check your email to reset password','Email send',{
      timeOut:2000,
      progressBar:true,
      progressAnimation:"increasing",
      positionClass:'toast-top-right'
    });
  },err=>{
    console.log(err);
    this.toaster.error(`${err.error.message}`,'Error',{
      timeOut:2000,
      progressBar:true,
      progressAnimation:"increasing",
      positionClass:'toast-top-right'
    });
  });
}
}
