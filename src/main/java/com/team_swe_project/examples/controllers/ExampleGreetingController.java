package com.team_swe_project.examples.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ExampleGreetingController {

	private static final String template = "Hello, %s!";
	private int counter = 0;

	@GetMapping("/greeting")
	public String getGreeting(@RequestParam(name = "name", required=false, defaultValue = "World") String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}
}
