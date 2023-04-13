package com.a2m.service.impl;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class ShowtimeServiceImpl implements ShowtimeService {
    private ShowtimesRepository showtimesRepository;

    @Override
    public List<Showtimes> today() {
        Date today = new Date();
        return this.showtimesRepository.today(today);
    }

    @Override
    public List<Showtimes> getAllShowtime() {
        return this.showtimesRepository.findAll();
    }


}
