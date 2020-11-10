package reddit.reddit.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reddit.reddit.model.Comment;
import reddit.reddit.model.Post;
import reddit.reddit.model.User;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findByUser(User user);
}
