package com.fastfour.pathfinderbackend.repository;

import java.util.Optional;

import com.fastfour.pathfinderbackend.model.ERole;
import com.fastfour.pathfinderbackend.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
