package com.fastfour.pathfinderbackend.model;

import jakarta.persistence.*;


@Entity
public class HikeTable {

    @Id
    @GeneratedValue
    private Long id;
    
    // @Column(name = "user_id")
    // Long userId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String trailName;
    private String areaName;
    private String walkable;
    private String bikeFriendly;
    private String distance;
    private String date;
    private String route_type;
    private String level;
    private String usage;
    private String accessibility;



    public Long getId() {
        return id;
    }


    public String getTrailName() {
        return trailName;
    }

    public void setTrailName(String trailName) {
        this.trailName = trailName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getWalkable() {
        return walkable;
    }

    public void setWalkable(String walkable) {
        this.walkable = walkable;
    }

    public String getBikeFriendly() {
        return bikeFriendly;
    }

    public void setBikeFriendly(String bikeFriendly) {
        this.bikeFriendly = bikeFriendly;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(String distance) {
        this.distance = distance;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    


}