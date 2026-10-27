package com.institute.crs.service;

import com.institute.crs.dto.CourseRequest;
import com.institute.crs.exception.ResourceNotFoundException;
import com.institute.crs.model.Course;
import com.institute.crs.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Transactional(readOnly = true)
    public List<Course> getAllCourses() {
        return courseRepository.findAllByOrderByIdDesc();
    }

    @Transactional(readOnly = true)
    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public Course createCourse(CourseRequest request) {
        Course course = new Course();
        course.setName(request.getName().trim());
        course.setDuration(request.getDuration().trim());
        course.setDescription(request.getDescription() != null ? request.getDescription().trim() : "");
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        if (!courseRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Course not found with id: " + id);
        }
        courseRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public long getCount() {
        return courseRepository.count();
    }
}
