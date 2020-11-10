package com.dakshit.Askanything.services;

import com.dakshit.Askanything.dto.VoteDto;
import com.dakshit.Askanything.exceptions.PostNotFoundException;
import com.dakshit.Askanything.exceptions.SpringRedditException;
import com.dakshit.Askanything.model.Post;
import com.dakshit.Askanything.model.Vote;
import com.dakshit.Askanything.repositories.PostRepository;
import com.dakshit.Askanything.repositories.VoteRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

import static com.dakshit.Askanything.model.VoteType.UPVOTE;


@Service
@AllArgsConstructor
@Slf4j
public class VoteService {
    private final PostRepository postRepository;
    private final VoteRepository voteRepository;
    private final AuthService authService;
    @Transactional
    public void vote(VoteDto voteDto){
        Post post= postRepository.findById(voteDto.getPostId()).orElseThrow(()-> new PostNotFoundException("Post Not Found WIth id"+voteDto.getPostId()));
        Optional<Vote> voteByPostAndUser=  voteRepository.findTopByPostAndUserOrderByVoteIdDesc(post,authService.getCurrentUser());
        if (voteByPostAndUser.isPresent() && voteByPostAndUser.get().getVoteType().equals(voteDto.getVoteType())){
            throw new SpringRedditException("You have already "+voteDto.getVoteType()+"'d for this post");
        }
        if (UPVOTE.equals(voteDto.getVoteType())){
            post.setVoteCount(post.getVoteCount()+1);
        }else{
            post.setVoteCount(post.getVoteCount()-1);
        }
        voteRepository.save(mapToDto(voteDto,post));
        postRepository.save(post);
    }

    private Vote mapToDto(VoteDto voteDto, Post post) {
        return Vote.builder()
                .voteType(voteDto.getVoteType())
                .post(post)
                .user(authService.getCurrentUser())
                .build();
    }
}