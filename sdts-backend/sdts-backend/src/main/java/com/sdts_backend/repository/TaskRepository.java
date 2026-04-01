package com.sdts_backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sdts_backend.entity.Priority;
import com.sdts_backend.entity.Status;
import com.sdts_backend.entity.User;
import com.sdts_backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByUser(User user);
	List<Task> findByStatus(Status status);
	List<Task> findByPriority(Priority priority);
	List<Task> findByDueDate(LocalDateTime dueDate);
	List<Task> findByUserUserId(Long userId);
	List<Task> findByDueDateBetween(LocalDateTime now, LocalDateTime tomorrow);
	List<Task> findByDueDateBefore(LocalDateTime dateTime);
}