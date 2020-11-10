package com.dakshit.Askanything.repositories;

import com.dakshit.Askanything.model.Comment;
import com.dakshit.Askanything.model.Post;
import com.dakshit.Askanything.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findByUser(User user);
}
