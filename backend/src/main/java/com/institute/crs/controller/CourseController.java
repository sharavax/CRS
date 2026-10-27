package com.institute.crs.controller;

import com.institute.crs.dto.CourseRequest;
import com.institute.crs.model.Course;
import com.institute.crs.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addCourse(@Valid @RequestBody CourseRequest request) {
        Course savedCourse = courseService.createCourse(request);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Course successfully added!");
        response.put("data", savedCourse);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Course deleted successfully.");

        return ResponseEntity.ok(response);
    }
}
