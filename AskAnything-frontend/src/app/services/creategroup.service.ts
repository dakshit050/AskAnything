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
  constructor(private http:HttpClient) { }
  creategroup(group:createGroup){
    console.log(group);
     return this.http.post('http://127.0.0.1:8080/api/community',group);
  }
  getAllGroup(): Observable<Array<groupModel>>{
    return this.http.get<Array<groupModel>>('http://127.0.0.1:8080/api/community/',this.noAuthHeader);
  }
  gergroupbyid(id:Number){
    return this.http.get(`http://127.0.0.1:8080/api/community/${id}`);
  }
}
