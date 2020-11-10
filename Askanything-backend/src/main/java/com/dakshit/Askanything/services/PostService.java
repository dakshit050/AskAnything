package com.dakshit.Askanything.services;

import com.dakshit.Askanything.dto.PostRequest;
import com.dakshit.Askanything.dto.PostResponse;
import com.dakshit.Askanything.exceptions.PostNotFoundException;
import com.dakshit.Askanything.exceptions.SpringRedditException;
import com.dakshit.Askanything.model.Community;
import com.dakshit.Askanything.model.Post;
import com.dakshit.Askanything.model.User;
import com.dakshit.Askanything.repositories.CommentRepository;
import com.dakshit.Askanything.repositories.CommunityRepository;
import com.dakshit.Askanything.repositories.PostRepository;
import com.dakshit.Askanything.repositories.UserRepository;
import com.github.marlonlom.utilities.timeago.TimeAgo;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
@Transactional
public class PostService {
    private final CommunityRepository communityRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    public Post save(PostRequest postRequest) {
        Community community=communityRepository.findByName(postRequest.getCommunityName())
                .orElseThrow(()-> new SpringRedditException(postRequest.getCommunityName()));
        User user= authService.getCurrentUser();
        Post post=Post.builder()
                .description(postRequest.getDescription())
                .postId(postRequest.getPostId())
                .postName(postRequest.getPostName())
                .url(postRequest.getUrl())
                .user(user)
                .community(community)
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
                .communityName(post.getCommunity().getName())
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
                .communityName(post.getCommunity().getName())
                .id(post.getPostId())
                .url(post.getUrl())
                .userName(post.getUser().getUsername())
                .voteCount(post.getVoteCount())
                .commentCount(commentRepository.findByPost(post).size())
                .duration(TimeAgo.using(post.getCreatedDate().toEpochMilli()))
                .build();
    }

    @Transactional
    public List<PostResponse> getPostsByCommunity(Long id) {
        Community community=communityRepository.findById(id)
                .orElseThrow(()->new SpringRedditException(id.toString()));
        List<Post> posts=postRepository.findAllByCommunity(community);
        return posts.stream().map(this::maptoDto).collect(Collectors.toList());

    }
    @Transactional
    public List<PostResponse> getPostsByUserName(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(()-> new UsernameNotFoundException(username));
        return postRepository.findByUser(user).stream()
                .map(this::maptoDto).collect(Collectors.toList());
    }
}
