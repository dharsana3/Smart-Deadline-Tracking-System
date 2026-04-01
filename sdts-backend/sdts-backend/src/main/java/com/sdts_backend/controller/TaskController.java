package com.sdts_backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sdts_backend.entity.Priority;
import com.sdts_backend.entity.Status;
import com.sdts_backend.entity.Task;
import com.sdts_backend.service.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/tasks")
public class TaskController {
	private final TaskService taskService;
	
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Task task)
	{
		Task createdTask = taskService.createTask(
		        task.getTitle(),
		        task.getDescription(),
		        task.getDueDate(),
		        task.getPriority(),
		        task.getUser().getUserId()
		);
		return ResponseEntity.ok(createdTask);
	}
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Task>> getTasksByUserId(@PathVariable Long userId)
	{
		List<Task> tasksByUserId = taskService.findTaskByUser(userId);
		return ResponseEntity.ok(tasksByUserId);
	}
	
	@PutMapping("/{taskId}")
	public ResponseEntity<Task> update(@PathVariable Long taskId, @RequestBody Task updatedTask)
	{
		Task task = taskService.updateTask(taskId, updatedTask);
		return ResponseEntity.ok(task);
	}
	
	@PatchMapping("/{taskId}/COMPLETE")
	public ResponseEntity<String> markTaskCompleted(@PathVariable Long taskId)
	{
		taskService.markTaskCompleted(taskId);
		return ResponseEntity.ok("Task Marked as Completed");
	}
	
	@DeleteMapping("/{taskId}")
	public ResponseEntity<String> deleteTask(@PathVariable Long taskId)
	{
		taskService.deleteTask(taskId);
		return ResponseEntity.ok("Task with Id :" + taskId + " is deleted");
	}
	
	@GetMapping("/due")
	public ResponseEntity<List<Task>> getTasksByDueDate(@RequestParam LocalDateTime dueDate)
	{
		List<Task> tasksByDueDate = taskService.findTaskByDueDate(dueDate);
		return ResponseEntity.ok(tasksByDueDate);
	}
	
	@GetMapping("/priority/{priority}")
	public ResponseEntity<List<Task>> getTasksByPriority(@PathVariable Priority priority)
	{
		List<Task> tasksByPriority = taskService.findByPriority(priority);
		return ResponseEntity.ok(tasksByPriority);
	}
	
	@GetMapping("/status/{status}")
	public ResponseEntity<List<Task>> getTasksByStatus(@PathVariable Status status)
	{
		List<Task> tasksByStatus = taskService.findByStatus(status);
		return ResponseEntity.ok(tasksByStatus);
	}
}