package com.aashish.taskmanager.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.aashish.taskmanager.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Spring Data will automatically implement basic CRUD methods
}

