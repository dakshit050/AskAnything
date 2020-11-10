package reddit.reddit.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reddit.reddit.dto.VoteDto;
import reddit.reddit.exceptions.PostNotFoundException;
import reddit.reddit.exceptions.SpringRedditException;
import reddit.reddit.model.Post;
import reddit.reddit.model.Vote;
import reddit.reddit.repositories.PostRepository;
import reddit.reddit.repositories.VoteRepository;

import javax.transaction.Transactional;
import java.util.Optional;

import static reddit.reddit.model.VoteType.UPVOTE;

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
