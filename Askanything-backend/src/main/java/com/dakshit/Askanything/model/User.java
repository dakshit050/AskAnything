package com.dakshit.Askanything.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;

import static javax.persistence.GenerationType.IDENTITY;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "askanything_users")
public class User {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long userId;
    @NonNull
    private String username;
    @NonNull
    private String password;

    @NonNull
    private String email;
    private Instant created;
    private boolean enabled;
}