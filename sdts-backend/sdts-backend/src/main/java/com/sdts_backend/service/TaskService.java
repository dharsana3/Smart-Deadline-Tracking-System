package com.sdts_backend.service;

import java.time.LocalDateTime;
import java.util.List;
import com.sdts_backend.entity.Task;
import com.sdts_backend.entity.Priority;
import com.sdts_backend.entity.Status;

public interface TaskService {
	Task createTask(String title,String description, LocalDateTime dueDate, Priority priority, Long userId);
	List<Task> findTaskByUser(Long userId);
	Task updateTask(Long taskId, Task updatedTask);
	void deleteTask(Long taskId);
	void markTaskCompleted(Long taskId);
	List<Task> findTaskByDueDate(LocalDateTime dueDate);
	List<Task> findByStatus(Status status);
	List<Task> findByPriority(Priority priority);
	
}