import { environment } from './../../environments/environment.prod';
import { votemodel } from './../models/vote.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.baseUrl;
  vote(vote:votemodel){
    return this.http.post(this.baseUrl+'api/votes',vote);
  }
}
