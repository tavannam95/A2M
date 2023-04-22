package com.a2m.schedule;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@EnableScheduling
public class ScheduleTest2 {

    @Scheduled(cron = "0 0/5 6-23 * * *")
    public void scheduleTest() throws IOException {
        log.warn("====scheduleTest====");
    }

}
