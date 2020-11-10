package com.dakshit.Askanything.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommunityDto {
    private long id;
    private String communityName;
    private String description;
    private Integer numberofPosts;
}
