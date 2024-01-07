package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.exception.HikeNotFoundException;
import com.fastfour.pathfinderbackend.exception.UserNotFoundException;
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

    @PutMapping("/edithike/{id}")
    HikeTable updateUser(@RequestBody HikeTable newHike, @PathVariable Long id) {
        if(!hikeTableRepo.existsById(id)){
            throw new HikeNotFoundException(id);
        }
        return hikeTableRepo.findById(id)
                .map(hikeTable -> {
                    hikeTable.setTrailName(newHike.getTrailName());
                    hikeTable.setAreaName(newHike.getAreaName());
                    hikeTable.setWalkable(newHike.getWalkable());
                    hikeTable.setBikeFriendly(newHike.getBikeFriendly());
                    hikeTable.setDistance(newHike.getDistance());
                    hikeTable.setDate(newHike.getDate());
                    return hikeTableRepo.save(hikeTable);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/deletehike/{id}")
    String deleteUser(@PathVariable Long id){
        if(!hikeTableRepo.existsById(id)){
            throw new HikeNotFoundException(id);
        }
        hikeTableRepo.deleteById(id);
        return  "Hike Details with id "+id+" has been deleted successfully.";
    }



}