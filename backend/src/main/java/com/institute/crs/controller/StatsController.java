package com.institute.crs.controller;

import com.institute.crs.service.CourseService;
import com.institute.crs.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    private final CourseService courseService;
    private final RegistrationService registrationService;

    @Autowired
    public StatsController(CourseService courseService, RegistrationService registrationService) {
        this.courseService = courseService;
        this.registrationService = registrationService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCourses", courseService.getCount());
        stats.put("totalRegistrations", registrationService.getCount());
        stats.put("status", "UP");
        return ResponseEntity.ok(stats);
    }
}
