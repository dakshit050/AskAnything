package com.dakshit.Askanything.repositories;

import com.dakshit.Askanything.model.Post;
import com.dakshit.Askanything.model.User;
import com.dakshit.Askanything.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,String> {
    Optional<Vote> findTopByPostAndUserOrderByVoteIdDesc(Post post, User currentUser);
}