package com.institute.crs.repository;

import com.institute.crs.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findAllByOrderByRegistrationDateDesc();
    List<Registration> findByCourseId(Long courseId);
    boolean existsByEmailAndCourseId(String email, Long courseId);
}
