import { throwError } from 'rxjs';
import { VoteType } from './../../models/votetype.model';
import { PostService } from './../../services/post.service';
import { votemodel } from './../../models/vote.model';
import { post } from './../../models/post.model';
import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() Post:any;
  votemodel:votemodel;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  constructor(private postservice:PostService,
              private votservice:VoteService) {
    this.votemodel={
      voteType:undefined,
      postId:undefined
    }
   }

  ngOnInit(): void {
    this.updateVoteDetails();
  }
  upvotePost() {
    this.votemodel.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votemodel.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votemodel.postId = this.Post.id;
    this.votservice.vote(this.votemodel).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      throwError(error);
    });
  }

private updateVoteDetails() {
  this.postservice.getPost(this.Post.id).subscribe(post => {
    this.Post = post;
  });
}
}
