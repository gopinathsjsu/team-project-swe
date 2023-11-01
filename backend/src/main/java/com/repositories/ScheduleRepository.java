package com.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entities.Schedule;


public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
