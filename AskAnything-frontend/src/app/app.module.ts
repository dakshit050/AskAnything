import { SubGroupSideBarComponent } from './Components/sub-group-side-bar/sub-group-side-bar.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './Components/auth/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { HomeComponent } from './Components/home/home.component';
import { OnePostComponent } from './Components/one-post/one-post.component';
import { SideBarComponent } from './Components/side-bar/side-bar.component';
import { CreateSubGroupComponent } from './Components/create-sub-group/create-sub-group.component';
import { ListGroupComponent } from './Components/list-group/list-group.component';
import { VoteButtonComponent } from './Components/vote-button/vote-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ViewPostComponent } from './Components/view-post/view-post.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { CommunityComponent } from './Components/community/community.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreatePostComponent,
    HomeComponent,
    OnePostComponent,
    SideBarComponent,
    SubGroupSideBarComponent,
    CreateSubGroupComponent,
    ListGroupComponent,
    VoteButtonComponent,
    ViewPostComponent,
    UserProfileComponent,
    CommunityComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
