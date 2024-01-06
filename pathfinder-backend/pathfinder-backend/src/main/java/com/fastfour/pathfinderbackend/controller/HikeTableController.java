package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.model.HikeTable;
import com.fastfour.pathfinderbackend.repository.HikeTableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:3000")
@RestController
public class HikeTableController {

    @Autowired
    private HikeTableRepo hikeTableRepo;
    @PostMapping("/createhike")
    HikeTable newHike(@RequestBody HikeTable newHike){
        return hikeTableRepo.save(newHike);
    }

    @GetMapping("/allhikes")
    List<HikeTable> getAllHikes(){
        return hikeTableRepo.findAll();
    }

}
