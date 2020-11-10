package reddit.reddit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reddit.reddit.model.Post;
import reddit.reddit.model.User;
import reddit.reddit.model.Vote;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,String> {
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc(Post post, User currentUser);
}
