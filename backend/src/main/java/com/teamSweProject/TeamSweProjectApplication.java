package com.teamSweProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
//import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "com.config")
@EnableAspectJAutoProxy
public class TeamSweProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(TeamSweProjectApplication.class, args);
	}

}
