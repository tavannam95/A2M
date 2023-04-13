package com.a2m.service.impl;

import com.a2m.entities.Showtimes;
import com.a2m.repository.ShowtimesRepository;
import com.a2m.service.ShowtimeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ShowtimeServiceImpl implements ShowtimeService {
    private ShowtimesRepository showtimesRepository;

    @Override
    public List<Showtimes> findByDate(Date date) {
        return this.showtimesRepository.findByDate(date);
    }
}
