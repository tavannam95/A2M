package com.a2m.entities;

public class ShowtimesInfor extends Showtimes{
    private String nameMovie;
    private int room_id;
    public String getNameMovie() {
        return nameMovie;
    }

    public void setNameMovie(String nameMovie) {
        this.nameMovie = nameMovie;
    }

    public int getRoom_id() {
        return room_id;
    }

    public void setRoom_id(int room_id) {
        this.room_id = room_id;
    }

}
