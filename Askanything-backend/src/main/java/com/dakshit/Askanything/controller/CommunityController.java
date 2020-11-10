package com.dakshit.Askanything.controller;
import com.dakshit.Askanything.dto.CommunityDto;
import com.dakshit.Askanything.services.CommunityService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
public class CommunityController {
    @Autowired
    private CommunityService communityService;
    @PostMapping
    public ResponseEntity<CommunityDto> createCommunity(@RequestBody CommunityDto communityDto){
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(communityService.save(communityDto));
    }

    @GetMapping("/")
    public ResponseEntity<List<CommunityDto>> getAllCommunity(){
        return ResponseEntity.status(HttpStatus.OK).body(communityService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommunityDto> getCommunity(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(communityService.getCommunity(id));
    }
}
