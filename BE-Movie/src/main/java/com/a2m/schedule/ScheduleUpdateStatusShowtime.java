package com.a2m.schedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.a2m.repository.ShowtimesRepository;

@Component
public class ScheduleUpdateStatusShowtime {
	
private Logger LOG = LoggerFactory.getLogger(ScheduleUpdateStatusShowtime.class);
	
	@Autowired
	ShowtimesRepository showtimesRepository;
	
	@Scheduled(cron = "* * * * * *")
    public void scheduleTaskWithCron() {
        // call send email method here
		LOG.info("Schedule update showtime");
        showtimesRepository.updateStatusShowtimes();
    }
}
