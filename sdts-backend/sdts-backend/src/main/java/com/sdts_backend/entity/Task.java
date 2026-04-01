package com.sdts_backend.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Task")

public class Task {
	public Task() {
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "task_id", nullable = false)
	private Long taskId;
	
	@Column(name = "title", nullable = false)
	private String title;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "due_date", nullable = false)
	private LocalDateTime dueDate;
	
	@CreationTimestamp
	@Column(name = "created_at", nullable = false)
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@Enumerated(EnumType.STRING)
	private Priority priority;
	
	@Enumerated(EnumType.STRING)
	private Status status;
	
	@ManyToOne
	@JsonBackReference
	@JoinColumn(name = "user_id",nullable = false)
	private User user;
	
	private boolean ReminderSent = false; 
	
	public Long getTaskId()
	{
		return taskId;
	}
	public void setTaskId(Long taskId)
	{
		this.taskId = taskId;
	}
	
	public String getDescription()
	{
		return description;
	}
	public void setDescription(String description)
	{
		this.description = description;
	}
	
	public String getTitle()
	{
		return title;
	}
	public void setTitle(String title)
	{
		this.title = title;
	}
	
	public LocalDateTime getDueDate()
	{
		return dueDate;
	}
	public void setDueDate(LocalDateTime dueDate)
	{
		this.dueDate = dueDate;
	}
	
	public LocalDateTime getCreatedAt()
	{
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt)
	{
		this.createdAt = createdAt;
	}
	
	public LocalDateTime getUpdatedAt()
	{
		return updatedAt;
	}
	public void setUpdatedAt(LocalDateTime updatedAt)
	{
		this.updatedAt = updatedAt;
	}
	
	public Priority getPriority()
	{
		return priority;
	}
	public void setPriority(Priority priority)
	{
		this.priority = priority;
	}
	
	public Status getStatus()
	{
		return status;
	}
	public void setStatus(Status status)
	{
		this.status = status;
	}
	
	public User getUser()
	{
		return user;
	}
	public void setUser(User user)
	{
		this.user = user;
	}
	public boolean isReminderSent() {
		return ReminderSent;
	}
	public void setReminderSent(boolean reminderSent) {
		this.ReminderSent = reminderSent;
	}
}
