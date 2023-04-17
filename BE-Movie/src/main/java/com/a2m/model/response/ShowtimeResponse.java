package com.a2m.model.response;

import com.a2m.entities.Movies;
import com.a2m.entities.Rooms;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ShowtimeResponse {
    @Id
    private Long idMovie;
    private String movieName;
    private String moviePoster;
    private String category;
    private Date premiereDate;

    public ShowtimeResponse(String movieName, String moviePoster, String category, Date premiereDate) {
        this.movieName = movieName;
        this.moviePoster = moviePoster;
        this.category = category;
        this.premiereDate = premiereDate;
    }
}
