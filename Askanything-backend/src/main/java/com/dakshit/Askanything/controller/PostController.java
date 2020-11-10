package com.dakshit.Askanything.controller;

import com.dakshit.Askanything.dto.PostRequest;
import com.dakshit.Askanything.dto.PostResponse;
import com.dakshit.Askanything.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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
    @GetMapping("/by-community/{id}")
    public List<PostResponse> getPostsByCommunity(@PathVariable Long id){
        return postService.getPostsByCommunity(id);
    }
    @GetMapping("/by-user/{username}")
    public List<PostResponse> getPostsByUserName(@PathVariable String username){
        return postService.getPostsByUserName(username);
    }
}