package com.institute.crs.repository;

import com.institute.crs.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findAllByOrderByIdDesc();
    boolean existsByNameIgnoreCase(String name);
}
