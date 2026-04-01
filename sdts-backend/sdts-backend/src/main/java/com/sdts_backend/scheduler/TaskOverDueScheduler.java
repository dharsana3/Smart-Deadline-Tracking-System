package com.sdts_backend.scheduler;

import java.time.LocalDate;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.sdts_backend.entity.Status;
import com.sdts_backend.entity.Task;
import com.sdts_backend.repository.TaskRepository;

@Component
public class TaskOverDueScheduler {

    private final TaskRepository taskRepository;

    public TaskOverDueScheduler(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void markAsOverDue() {

        LocalDate today = LocalDate.now();

        List<Task> tasks = taskRepository.findAll();

        for (Task task : tasks) {

            LocalDate taskDate = task.getDueDate().toLocalDate();

            if (taskDate.isBefore(today) && task.getStatus() != Status.COMPLETED) {
                task.setStatus(Status.OVERDUE);
            }
        }

        taskRepository.saveAll(tasks);
    }
}