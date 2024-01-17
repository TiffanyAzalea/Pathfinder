package com.fastfour.pathfinderbackend.repository;

import com.fastfour.pathfinderbackend.model.HikeTable;
import com.fastfour.pathfinderbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface HikeTableRepo extends JpaRepository<HikeTable, Long> {
    List<HikeTable> findHikesByUser(User user);

}

