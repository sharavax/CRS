package com.institute.crs.config;

import com.institute.crs.model.Course;
import com.institute.crs.model.Registration;
import com.institute.crs.repository.CourseRepository;
import com.institute.crs.repository.RegistrationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final RegistrationRepository registrationRepository;

    public DataInitializer(CourseRepository courseRepository, RegistrationRepository registrationRepository) {
        this.courseRepository = courseRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    public void run(String... args) {
        if (courseRepository.count() == 0) {
            Course c1 = new Course("Full Stack Java & Spring Boot", "12 Weeks", "End-to-end modern enterprise Java development, Spring Boot microservices, Hibernate ORM, and REST APIs.");
            Course c2 = new Course("Python & Data Science Bootcamp", "10 Weeks", "Data analysis, machine learning algorithms, NumPy, Pandas, visualization, and practical AI models.");
            Course c3 = new Course("Cloud Architecture & AWS Solutions", "8 Weeks", "Design highly scalable cloud infrastructure, Docker containerization, Kubernetes, and CI/CD pipelines.");
            Course c4 = new Course("Modern React & Frontend Engineering", "6 Weeks", "Master modern React 18, state management, hooks, reusable design systems, and responsive UI.");
            Course c5 = new Course("Cybersecurity & Ethical Hacking", "8 Weeks", "Network defense, vulnerability assessments, security compliance, penetration testing, and incident response.");

            List<Course> savedCourses = courseRepository.saveAll(Arrays.asList(c1, c2, c3, c4, c5));

            if (registrationRepository.count() == 0 && !savedCourses.isEmpty()) {
                Registration r1 = new Registration("Alex Johnson", "alex.johnson@example.com", savedCourses.get(0));
                Registration r2 = new Registration("Sophia Chen", "sophia.chen@example.com", savedCourses.get(1));
                registrationRepository.saveAll(Arrays.asList(r1, r2));
            }
        }
    }
}
