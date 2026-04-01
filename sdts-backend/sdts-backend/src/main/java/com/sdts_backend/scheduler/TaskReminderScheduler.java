package com.sdts_backend.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sdts_backend.entity.Status;
import com.sdts_backend.entity.Task;
import com.sdts_backend.repository.TaskRepository;
import com.sdts_backend.service.EmailService;

@Component
public class TaskReminderScheduler {

    private final TaskRepository taskRepository;
    private final EmailService emailService;

    public TaskReminderScheduler(TaskRepository taskRepository,
                                 EmailService emailService) {
        this.taskRepository = taskRepository;
        this.emailService = emailService;
    }

    // runs every minute
    @Scheduled(fixedRate = 60000) 
    public void sendTaskReminders() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime tomorrow = now.plusDays(1);

        List<Task> tasks = taskRepository.findByDueDateBetween(now, tomorrow);
        for(Task task : tasks) {

        	if(!task.isReminderSent() && task.getStatus() != Status.COMPLETED)
        	{
        		String email = task.getUser().getEmail();
			    emailService.sendReminder(
			    		email,
		                "Task Reminder",
		                "Your task '" + task.getTitle() + "' is due tomorrow.");
			    task.setReminderSent(true);
			    taskRepository.save(task);
        	}
        }
    }
}