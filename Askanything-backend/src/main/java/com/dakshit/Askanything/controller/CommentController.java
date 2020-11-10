package com.dakshit.Askanything.controller;

import com.dakshit.Askanything.dto.CommentDto;
import com.dakshit.Askanything.services.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments/")
@AllArgsConstructor
public class CommentController {
    private final CommentService commentService;
    @PostMapping
    public ResponseEntity<Void> createComment(@RequestBody CommentDto commentsDto){
        commentService.save(commentsDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @GetMapping("/by-post/{id}")
    public ResponseEntity<List<CommentDto>> getAllCommentsForPost(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllCommentForPost(id));
    }

    @GetMapping("/by-user/{name}")
    public ResponseEntity<List<CommentDto>> getAllCommentForUser(@PathVariable String name){
        return ResponseEntity.status(HttpStatus.OK).body(commentService.getAllCommentForUser(name));
    }
}