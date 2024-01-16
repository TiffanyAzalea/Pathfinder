package com.fastfour.pathfinderbackend.model;

import jakarta.persistence.*;


@Entity
public class HikeTable {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    Long userId;

    @OneToOne
    @PrimaryKeyJoinColumn(name = "user_id")
    User user;
    private Long id;
    private String trailName;
    private String areaName;
    private String walkable;
    private String bikeFriendly;
    private String distance;
    private String date;


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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setId(Long id) {
        this.id = id;
    }

}