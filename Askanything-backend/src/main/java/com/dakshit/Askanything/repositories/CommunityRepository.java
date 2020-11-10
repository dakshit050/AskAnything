package com.dakshit.Askanything.repositories;

import com.dakshit.Askanything.model.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {
    Optional<Community> findByName(String name);
}
