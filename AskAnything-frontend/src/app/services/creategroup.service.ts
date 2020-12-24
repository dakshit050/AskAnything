import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs';
import { createGroup } from './../models/group.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { groupModel } from '../models/groupresponse.model';

@Injectable({
  providedIn: 'root'
})
export class CreategroupService {
  noAuthHeader ={headers: new HttpHeaders({'NoAuth':'True'})};
  baseUrl= environment.baseUrl;
  constructor(private http:HttpClient) { }
  creategroup(group:createGroup){
     return this.http.post(this.baseUrl+'api/community',group);
  }
  getAllGroup(): Observable<Array<groupModel>>{
    return this.http.get<Array<groupModel>>(this.baseUrl+'api/community/');
  }
  gergroupbyid(id:Number){
    return this.http.get(this.baseUrl+`api/community/${id}`);
  }
}
