package reddit.reddit.services;

import com.github.marlonlom.utilities.timeago.TimeAgo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reddit.reddit.dto.PostRequest;
import reddit.reddit.dto.PostResponse;
import reddit.reddit.exceptions.PostNotFoundException;
import reddit.reddit.exceptions.SpringRedditException;
import reddit.reddit.exceptions.SubredditNotFoundException;
import reddit.reddit.model.Post;
import reddit.reddit.model.Subreddit;
import reddit.reddit.model.User;
import reddit.reddit.repositories.CommentRepository;
import reddit.reddit.repositories.PostRepository;
import reddit.reddit.repositories.SubredditRepository;
import reddit.reddit.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final SubredditRepository subredditRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    public Post save(PostRequest postRequest) {
        Subreddit subreddit=subredditRepository.findByName(postRequest.getSubredditName())
                .orElseThrow(()-> new SpringRedditException(postRequest.getSubredditName()));
        User user= authService.getCurrentUser();
        Post post=Post.builder()
                .description(postRequest.getDescription())
                .postId(postRequest.getPostId())
                .postName(postRequest.getPostName())
                .url(postRequest.getUrl())
                .user(user)
                .subreddit(subreddit)
                .createdDate(java.time.Instant.now())
                .voteCount(0)
                .build();
        return postRepository.save(post);

    }
    @Transactional
    public PostResponse getPost(Long id) {
        Post post= postRepository.findById(id)
                .orElseThrow(()-> new PostNotFoundException(id.toString()));
        return PostResponse.builder()
                .description(post.getDescription())
                .postName(post.getPostName())
                .subredditName(post.getSubreddit().getName())
                .id(post.getPostId())
                .url(post.getUrl())
                .userName(post.getUser().getUsername())
                .duration(TimeAgo.using(post.getCreatedDate().toEpochMilli()))
                .voteCount(post.getVoteCount())
                .build();
    }
    @Transactional
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll().stream()
                .map(this::maptoDto).collect(Collectors.toList());
    }

    private PostResponse maptoDto(Post post) {
        return PostResponse.builder()
                .description(post.getDescription())
                .postName(post.getPostName())
                .subredditName(post.getSubreddit().getName())
                .id(post.getPostId())
                .url(post.getUrl())
                .userName(post.getUser().getUsername())
                .voteCount(post.getVoteCount())
                .commentCount(commentRepository.findByPost(post).size())
                .duration(TimeAgo.using(post.getCreatedDate().toEpochMilli()))
                .build();
    }

    @Transactional
    public List<PostResponse> getPostsBySubreddit(Long id) {
        Subreddit subreddit=subredditRepository.findById(id)
                .orElseThrow(()->new SpringRedditException(id.toString()));
        List<Post> posts=postRepository.findAllBySubreddit(subreddit);
        return posts.stream().map(this::maptoDto).collect(Collectors.toList());

    }
    @Transactional
    public List<PostResponse> getPostsByUserName(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException(username));
        return postRepository.findByUser(user).stream()
                .map(this::maptoDto).collect(Collectors.toList());
    }
}
