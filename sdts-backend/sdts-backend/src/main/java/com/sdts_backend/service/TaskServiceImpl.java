package com.sdts_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sdts_backend.entity.Priority;
import com.sdts_backend.entity.Status;
import com.sdts_backend.entity.Task;
import com.sdts_backend.entity.User;
import com.sdts_backend.repository.TaskRepository;
import com.sdts_backend.repository.UserRepository;

@Service
public class TaskServiceImpl implements TaskService{

	private final TaskRepository taskRepository;
	private final UserRepository userRepository;
	
	public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository) {
		this.taskRepository = taskRepository;
		this.userRepository = userRepository;
	}
	@Override
	public Task createTask(String title,String description, LocalDateTime dueDate, Priority priority, Long userId) {
		
		User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

		Task task = new Task();
		task.setTitle(title);
		task.setDescription(description);
		task.setDueDate(dueDate);
		task.setPriority(priority);
		if (dueDate != null && dueDate.isBefore(LocalDateTime.now())) {
		    task.setStatus(Status.OVERDUE);
		} else {
		    task.setStatus(Status.PENDING);
		}
		task.setUser(user);
		
		return taskRepository.save(task);
	}

	@Override
	public List<Task> findTaskByUser(Long userId) {
		return taskRepository.findByUserUserId(userId);
	}

	@Override
	public Task updateTask(Long taskId, Task updatedTask) {
		Task task = taskRepository.findById(taskId)
				.orElseThrow(() -> new RuntimeException("Task not found with taskId : " + taskId));
		
		task.setTitle(updatedTask.getTitle());
		task.setDescription(updatedTask.getDescription());
		task.setDueDate(updatedTask.getDueDate());
		task.setPriority(updatedTask.getPriority());
		task.setStatus(updatedTask.getStatus());
		
		return taskRepository.save(task);
	}

	@Override
	public void deleteTask(Long taskId) {
		if(!taskRepository.existsById(taskId)) {
	        throw new RuntimeException("Task not found with id: " + taskId);
	    }
		taskRepository.deleteById(taskId);
	}

	@Override
	public void markTaskCompleted(Long taskId) {
		Task task = taskRepository.findById(taskId)
				.orElseThrow(() -> new RuntimeException("Task not found"));
		task.setStatus(Status.COMPLETED);
		taskRepository.save(task);
	}
	
	@Override
	public List<Task> findTaskByDueDate(LocalDateTime dueDate) {
		return taskRepository.findByDueDate(dueDate);
	}
	
	@Override
	public List<Task> findByStatus(Status status) {
		return taskRepository.findByStatus(status);
	}
	
	@Override
	public List<Task> findByPriority(Priority priority) {
		return taskRepository.findByPriority(priority);
	}
}
