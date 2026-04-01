package com.sdts_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SdtsBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SdtsBackendApplication.class, args);
	}
}
