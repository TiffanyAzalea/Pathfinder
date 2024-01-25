package com.fastfour.pathfinderbackend.repository;


import com.fastfour.pathfinderbackend.model.HikeTable;
import org.springframework.data.jpa.repository.JpaRepository;



public interface HikeListRepo extends JpaRepository<HikeTable, Long> {


}

