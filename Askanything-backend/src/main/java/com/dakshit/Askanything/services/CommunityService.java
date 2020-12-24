package com.dakshit.Askanything.services;

import com.dakshit.Askanything.dto.CommunityDto;
import com.dakshit.Askanything.exceptions.SpringRedditException;
import com.dakshit.Askanything.model.Community;
import com.dakshit.Askanything.model.User;
import com.dakshit.Askanything.repositories.CommunityRepository;
import com.dakshit.Askanything.repositories.PostRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CommunityService {
    private final AuthService authService;
    private final CommunityRepository communityRepository;
    private final PostRepository postRepository;
    @Transactional
    public CommunityDto save(CommunityDto communityDto){
        User user= authService.getCurrentUser();
        boolean community=communityRepository.findByName(communityDto.getCommunityName()).isPresent();
        if(community){
            throw new SpringRedditException("Community "+ communityDto.getCommunityName() +"allready exists");
        }
        Community subreddit= Community.builder().name(communityDto.getCommunityName())
                .description(communityDto.getDescription())
                .createdDate(java.time.Instant.now())
                .user(user)
                .build();
        Community save= communityRepository.save(subreddit);
        communityDto.setId(save.getId());
        return communityDto;
    }
    @Transactional
    public List<CommunityDto> getAll() {
        return communityRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private CommunityDto mapToDto(Community community) {
        return CommunityDto.builder().communityName(community.getName())
                .id(community.getId())
                .description(community.getDescription())
                .numberofPosts(community.getPosts().size())
                .build();
    }

    @Transactional
    public CommunityDto getCommunity(Long id) {
        Community community=communityRepository.findById(id)
                .orElseThrow(()->new SpringRedditException("No Subreddit found with id "+id));
        return CommunityDto.builder()
                .numberofPosts(postRepository.findAllByCommunity(community).size())
                .description(community.getDescription())
                .communityName(community.getName())
                .id(community.getId()).build();
    }
}
