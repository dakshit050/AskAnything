import { passwordReset, email } from './../models/password.model';
import { environment } from './../../environments/environment.prod';
import { loginrequest } from './../models/login.model';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { signuprequest } from './../models/signup.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})};
  constructor(private httpclient:HttpClient,
              private router:Router) { }
    baseUrl=environment.baseUrl;
  signup(Signuprequest:signuprequest){
    return this.httpclient.post(this.baseUrl+'api/auth/signup',Signuprequest,this.noAuthHeader);
  }
  login(loginrequest:loginrequest){
    return this.httpclient.post(this.baseUrl+'api/auth/login',loginrequest,this.noAuthHeader);
  }

  updatepassword(passwordreset:passwordReset){
    return this.httpclient.post(this.baseUrl+'api/auth/changePassword',passwordreset,this.noAuthHeader);
  }
 requestpasswordrest(Email:email){
 return this.httpclient.post(this.baseUrl+'api/auth/resetPassword',Email,this.noAuthHeader);
 }
  getToken(){
    return localStorage.getItem('token');
  }
  getUserName(){
    var token=this.getToken();
    return JSON.parse(atob(token.split('.')[1])).sub;
  }
  DeleteToken(){
      localStorage.removeItem('token');
  }
   getuserpayload(){
    var token=this.getToken();
    if(token){
      var check=JSON.parse(atob(token.split('.')[1]));
      return check;
    }else{
      return null;
    }
  } 
  isLogin(){
    var user=this.getuserpayload();
    if(user){
      return user.exp > Date.now()/1000;
    }else{
      return false;
    } 
  }
  logout(){
    this.DeleteToken();
    this.router.navigateByUrl('/login');
  }
}
