package reddit.reddit.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reddit.reddit.dto.SubredditDto;
import reddit.reddit.exceptions.SpringRedditException;
import reddit.reddit.model.Post;
import reddit.reddit.model.Subreddit;
import reddit.reddit.model.User;
import reddit.reddit.repositories.PostRepository;
import reddit.reddit.repositories.SubredditRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class SubredditService {
    private final AuthService authService;
    private final SubredditRepository subredditRepository;
    private final PostRepository postRepository;
    @Transactional
    public SubredditDto save(SubredditDto subredditDto){
        User user= authService.getCurrentUser();
       Subreddit subreddit= Subreddit.builder().name(subredditDto.getSubredditName())
                .description(subredditDto.getDescription())
                .createdDate(java.time.Instant.now())
                .user(user)
                .build();
      Subreddit save= subredditRepository.save(subreddit);
      subredditDto.setId(save.getId());
      return subredditDto;
    }
    @Transactional
    public List<SubredditDto> getAll() {
        return subredditRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private SubredditDto mapToDto(Subreddit subreddit) {
        return SubredditDto.builder().SubredditName(subreddit.getName())
                .id(subreddit.getId())
                .description(subreddit.getDescription())
                .numberofPosts(subreddit.getPosts().size())
                .build();
    }

    public SubredditDto getSubreddit(Long id) {
        Subreddit subreddit=subredditRepository.findById(id)
                .orElseThrow(()->new SpringRedditException("No Subreddit found with id "+id));
        return SubredditDto.builder()
                .numberofPosts(postRepository.findAllBySubreddit(subreddit).size())
                .description(subreddit.getDescription())
                .SubredditName(subreddit.getName())
                .id(subreddit.getId()).build();
    }
}
