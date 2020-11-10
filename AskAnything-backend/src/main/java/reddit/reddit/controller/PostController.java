package reddit.reddit.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reddit.reddit.dto.PostRequest;
import reddit.reddit.dto.PostResponse;
import reddit.reddit.services.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
public class PostController {

    private final PostService postService;
    @PostMapping
    public ResponseEntity createPost(@RequestBody PostRequest postRequest){
        postService.save(postRequest);
        return new ResponseEntity(HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public PostResponse getpost(@PathVariable Long id){
        return postService.getPost(id);
    }
    @GetMapping("/") 
    public List<PostResponse> getAllPosts(){
        return postService.getAllPosts();
    }
    @GetMapping("/by-subreddit/{id}")
    public List<PostResponse> getPostsBySubreddit(@PathVariable Long id){
        return postService.getPostsBySubreddit(id);
    }
    @GetMapping("/by-user/{username}")
    public List<PostResponse> getPostsByUserName(@PathVariable String username){
        return postService.getPostsByUserName(username);
    }
}
