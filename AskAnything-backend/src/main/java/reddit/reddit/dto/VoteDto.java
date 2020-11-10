package reddit.reddit.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reddit.reddit.model.VoteType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VoteDto {
    private VoteType voteType;
    private Long postId;
}
