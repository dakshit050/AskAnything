import { votemodel } from './../models/vote.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http:HttpClient) { }

  vote(vote:votemodel){
    return this.http.post('http://127.0.0.1:8080/api/votes',vote);
  }
}
