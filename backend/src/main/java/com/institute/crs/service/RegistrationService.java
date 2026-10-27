package com.institute.crs.service;

import com.institute.crs.dto.RegistrationRequest;
import com.institute.crs.exception.DuplicateRegistrationException;
import com.institute.crs.exception.ResourceNotFoundException;
import com.institute.crs.model.Course;
import com.institute.crs.model.Registration;
import com.institute.crs.repository.CourseRepository;
import com.institute.crs.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository, CourseRepository courseRepository) {
        this.registrationRepository = registrationRepository;
        this.courseRepository = courseRepository;
    }

    @Transactional(readOnly = true)
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAllByOrderByRegistrationDateDesc();
    }

    @Transactional(readOnly = true)
    public Registration getRegistrationById(Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found with id: " + id));
    }

    public Registration registerStudent(RegistrationRequest request) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Selected course with ID " + request.getCourseId() + " does not exist."));

        String cleanEmail = request.getEmail().trim().toLowerCase();

        // Check for duplicate registration for same course & email
        if (registrationRepository.existsByEmailAndCourseId(cleanEmail, course.getId())) {
            throw new DuplicateRegistrationException("Student with email '" + cleanEmail + "' is already registered for '" + course.getName() + "'.");
        }

        Registration registration = new Registration();
        registration.setStudentName(request.getStudentName().trim());
        registration.setEmail(cleanEmail);
        registration.setCourse(course);
        registration.setStatus("REGISTERED");

        return registrationRepository.save(registration);
    }

    public void cancelRegistration(Long id) {
        Registration registration = registrationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cannot cancel. Registration not found with id: " + id));
        registrationRepository.delete(registration);
    }

    @Transactional(readOnly = true)
    public long getCount() {
        return registrationRepository.count();
    }
}
