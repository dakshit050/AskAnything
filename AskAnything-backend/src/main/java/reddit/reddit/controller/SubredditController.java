package reddit.reddit.controller;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reddit.reddit.dto.SubredditDto;
import reddit.reddit.exceptions.SpringRedditException;
import reddit.reddit.services.SubredditService;

import java.util.List;

@RestController
@RequestMapping("/api/subreddit")
public class SubredditController {
    @Autowired
    private SubredditService subredditService;
    @PostMapping
    public ResponseEntity<SubredditDto> createSubreddit(@RequestBody SubredditDto subredditdto){
         return ResponseEntity.status(HttpStatus.CREATED)
                 .body(subredditService.save(subredditdto));
    }

    @GetMapping("/")
    public ResponseEntity<List<SubredditDto>> getAllSubreddits(){
       return ResponseEntity.status(HttpStatus.OK).body(subredditService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubredditDto> getSubreddit(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(subredditService.getSubreddit(id));
    }
}
