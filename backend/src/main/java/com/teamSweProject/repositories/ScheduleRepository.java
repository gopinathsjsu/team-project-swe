package com.teamSweProject.repositories;

import com.teamSweProject.entities.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    List<Schedule> findByMultiplexMultiplexId(Long multiplexId);
}
