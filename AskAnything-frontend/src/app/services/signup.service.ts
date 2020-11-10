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

  signup(Signuprequest:signuprequest){
    console.log(Signuprequest);
    return this.httpclient.post('http://127.0.0.1:8080/api/auth/signup',Signuprequest,this.noAuthHeader);
  }
  login(loginrequest:loginrequest){
    return this.httpclient.post('http://127.0.0.1:8080/api/auth/login',loginrequest,this.noAuthHeader);
  }

  getToken(){
    return localStorage.getItem('token');
  }
  getUserName(){
    return localStorage.getItem('userName');
  }
  DeleteToken(){
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
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
