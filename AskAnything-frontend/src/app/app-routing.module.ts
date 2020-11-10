import { CommunityComponent } from './Components/community/community.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ViewPostComponent } from './Components/view-post/view-post.component';
import { ListGroupComponent } from './Components/list-group/list-group.component';
import { CreateSubGroupComponent } from './Components/create-sub-group/create-sub-group.component';
import { HomeComponent } from './Components/home/home.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { AuthGuardGuard } from './Components/auth/auth-guard.guard';

const routes: Routes = [
  { path:'login', component:LoginComponent},
  { path:'signup', component:SignupComponent},
  { path:'createpost',component:CreatePostComponent,canActivate:[AuthGuardGuard]},
  { path:'view-post/:id',component:ViewPostComponent,canActivate:[AuthGuardGuard]},
  { path:'creategroup',component:CreateSubGroupComponent,canActivate:[AuthGuardGuard]},
  { path:'list-group',component:ListGroupComponent,canActivate:[AuthGuardGuard]},
  { path:'user-profile/:name',component:UserProfileComponent,canActivate:[AuthGuardGuard]},
  { path:'community/:id',component:CommunityComponent,canActivate:[AuthGuardGuard]},
  { path:'',component:HomeComponent,canActivate:[AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
