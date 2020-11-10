import { ToastrService } from 'ngx-toastr';
import { SignupService } from './../../services/signup.service';
import { signuprequest } from './../../models/signup.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  signupRequest:signuprequest;
  islogin:boolean;
  constructor(private formBuilder:FormBuilder,
              private signupservice:SignupService,
              private router:Router,
              private toster:ToastrService) { 
    this.signupRequest={
      email:'',
      username:'',
      password:''
    }
  }

  ngOnInit(): void {
    this.islogin=this.signupservice.isLogin();
    if(this.islogin){
      this.router.navigateByUrl('/');
    }
    this.signupForm=this.formBuilder.group({
      email:['',Validators.required],
      username:['',[Validators.minLength(3),Validators.maxLength(20),Validators.required]],
      password:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
  }
  signup(){
    if(this.signupForm.get('password').value===(this.signupForm.get('confirmpassword').value)){
      this.signupRequest.email=this.signupForm.get('email').value;
      this.signupRequest.password=this.signupForm.get('password').value;
      this.signupRequest.username=this.signupForm.get('username').value;
      this.signupservice.signup(this.signupRequest).subscribe(data=>{
        console.log(data);
        this.toster.success('Account created','Success',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
        this.router.navigate(['/login'])
      },err=>{
        this.toster.error(`${err.error.message}`,'Error',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
        }
      )
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
