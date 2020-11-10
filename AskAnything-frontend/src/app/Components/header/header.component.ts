import { SignupService } from './../../services/signup.service';
import { Component, OnInit } from '@angular/core';
import * as M from "materialize-css"
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean;
  User:String;
 // faUser:any;
  constructor(private authservice:SignupService) {
   // this.faUser=faUser;
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    });
   }
   faUser=faUser;
   powerOff=faPowerOff;
  ngOnInit(): void {
    this.isLogin=this.authservice.isLogin();
    this.User=this.authservice.getUserName();
  }
  logout(){
    this.authservice.logout();
  }
}
