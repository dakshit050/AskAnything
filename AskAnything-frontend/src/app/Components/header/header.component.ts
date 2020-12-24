import { SignupService } from './../../services/signup.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as M from "materialize-css/dist/js/materialize"
import { faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  isLogin:boolean;
  User:String;
  constructor(private authservice:SignupService) {
   // this.faUser=faUser;
/*     document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems);
    }); */
   }
   faUser=faUser;
   powerOff=faPowerOff;

   ngAfterViewInit(): void {
    setTimeout( function() {
      var elem = document.querySelector('.sidenav');
      var instance = M.Sidenav.init(elem);
    }, 0)
  }

  ngOnInit(): void {
    this.isLogin=this.authservice.isLogin();
    if(this.isLogin){
      this.User=this.authservice.getUserName();
    }
  }
  logout(){
    this.authservice.logout();
  }
}
