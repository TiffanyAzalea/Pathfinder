package com.fastfour.pathfinderbackend.controller;

import com.fastfour.pathfinderbackend.exception.HikeNotFoundException;
import com.fastfour.pathfinderbackend.exception.UserNotFoundException;
import com.fastfour.pathfinderbackend.model.HikeTable;
import com.fastfour.pathfinderbackend.model.User;
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
    HikeTable newHikeTable(@RequestBody HikeTable newHikeTable){
        return hikeTableRepo.save(newHikeTable);
    }

    @GetMapping("/allhikes")
    List<HikeTable> getAllHikes(){
        return hikeTableRepo.findAll();
    }

    @GetMapping("/viewhike/{id}")
    HikeTable getHikeById(@PathVariable Long id) {
        return hikeTableRepo.findById(id)
                .orElseThrow(()->new HikeNotFoundException(id));
    }


    @PutMapping("/edithike/{id}")
    HikeTable updatehike(@RequestBody HikeTable newHikeTable, @PathVariable Long id) {
        if(!hikeTableRepo.existsById(id)){
            throw new HikeNotFoundException(id);
        }
        return hikeTableRepo.findById(id)
                .map(hikeTable -> {
                    hikeTable.setTrailName(newHikeTable.getTrailName());
                    hikeTable.setAreaName(newHikeTable.getAreaName());
                    hikeTable.setWalkable(newHikeTable.getWalkable());
                    hikeTable.setBikeFriendly(newHikeTable.getBikeFriendly());
                    hikeTable.setDistance(newHikeTable.getDistance());
                    hikeTable.setDate(newHikeTable.getDate());
                    return hikeTableRepo.save(hikeTable);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/deletehike/{id}")
    String deletehike(@PathVariable Long id){
        if(!hikeTableRepo.existsById(id)){
            throw new HikeNotFoundException(id);
        }
        hikeTableRepo.deleteById(id);
        return  "Hike Details with id "+id+" has been deleted successfully.";
    }


}

