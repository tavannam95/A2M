//package com.a2m.service.impl;
//
//import java.sql.Time;
//import java.util.Date;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import com.a2m.entities.Showtimes;
//import com.a2m.repository.ShowtimesRepository;
//import com.a2m.service.ScheduleTaskService;
//
//@Component
//public class ScheduleTaskServiceImpl implements ScheduleTaskService{
//	@Autowired
//	ShowtimesRepository showtimesRepository;
//	
//	Showtimes showtimes = new Showtimes();
//	long timeBetween = showtimes.getTimeEnd().getTime() - showtimes.getTimeStart().getTime();
//	String timeBetweenToString = String.valueOf(timeBetween);
////	@Scheduled(cron = timeBetweenToString)
//    public void scheduleTaskWithCron() {
//        // call send email method here
//        
//    }
//
//}
