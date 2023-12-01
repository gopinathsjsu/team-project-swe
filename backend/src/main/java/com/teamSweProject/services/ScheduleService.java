package com.teamSweProject.services;

import com.teamSweProject.entities.Schedule;
import com.teamSweProject.repositories.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(Long id) {
        return scheduleRepository.findById(id);
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    public List<Schedule> getSchedulesByMultiplexId(Long multiplexId) {
        return scheduleRepository.findByMultiplexMultiplexId(multiplexId);
    }

    public Schedule removeMovieFromSchedule(Long scheduleId, Long movieId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElse(null);
        if (schedule == null) {
            System.out.println("Schedule does not exist, movie not removed");
            return null;
        }

        schedule.getMovies().removeIf(movie -> movie.getMovieId().equals(movieId));
        return scheduleRepository.save(schedule);
    }
}