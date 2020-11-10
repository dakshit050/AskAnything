package com.dakshit.Askanything.repositories;

import com.dakshit.Askanything.model.Community;
import com.dakshit.Askanything.model.Post;
import com.dakshit.Askanything.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllByCommunity(Community community);

    List<Post> findByUser(User user);
}
