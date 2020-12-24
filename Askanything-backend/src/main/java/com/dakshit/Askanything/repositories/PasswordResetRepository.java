package com.dakshit.Askanything.repositories;

import com.dakshit.Askanything.model.PasswordResetToken;
import com.dakshit.Askanything.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordResetToken,Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUser(User user);
}
