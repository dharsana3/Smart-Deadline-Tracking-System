package com.sdts_backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "users")
public class User {
	public User()
	{
		
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id",nullable = false)
	private Long userId;
	
	@Column(name = "username",nullable = false)
	private String username;
	
	@Column(name = "email",unique = true,nullable = false)
	private String email;
	
	@Column(name = "password_hash",nullable = false)
	private String passwordHash;
	
	@CreationTimestamp
	@Column(name = "created_at",updatable = false, nullable = false)
	private LocalDateTime createdAt;
	
	@UpdateTimestamp
	@Column(name = "updated_at", nullable = false)
	private LocalDateTime updatedAt;
	
	@OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Task> tasks;
	
	public Long getUserId()
	{
		return userId;
	}
	public void setUserId(Long userId)
	{
		this.userId = userId;
	}
	public String getUsername()
	{
		return username;
	}
	public void setUsername(String username)
	{
		this.username = username;
	}
	public String getEmail()
	{
		return email;
	}
	public void setEmail(String email)
	{
		this.email = email;
	}
	public String getPasswordHash()
	{
		return passwordHash;
	}
	public void setPasswordHash(String passwordHash)
	{
		this.passwordHash = passwordHash;
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
}