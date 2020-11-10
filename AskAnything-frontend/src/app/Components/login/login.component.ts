import { Routes, Router } from '@angular/router';
import { loginrequest } from './../../models/login.model';
import { SignupService } from './../../services/signup.service';
  
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Login:FormGroup;
  username:String;
  password:String;
  loginrequest:loginrequest;
  islogin:boolean;
  constructor(private formBuilder:FormBuilder,
              private authservice:SignupService,
              private router:Router,
              private toster:ToastrService) { 
                this.loginrequest={
                  username:'',
                  password:''
                }
              }

  ngOnInit(): void {
    this.islogin=this.authservice.isLogin();
    if(this.islogin){
      this.router.navigateByUrl('/');
    }
    this.Login=this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
      this.loginrequest.username=this.Login.get('username').value;
      this.loginrequest.password=this.Login.get('password').value;
      this.authservice.login(this.loginrequest).subscribe(data=>{
        localStorage.setItem('token',data['jwt']);
        localStorage.setItem('userName',data['userName']);
        this.router.navigate(['']);
      },error=>{
        this.toster.error(`${error.error.message}`,'Error',{
          timeOut:2000,
          progressBar:true,
          progressAnimation:"increasing",
          positionClass:'toast-top-right'
        });
      }
      );
  }
}
