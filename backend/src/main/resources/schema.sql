-- ===================================================
-- Course Registration System (CRS) - MySQL Schema
-- ===================================================

CREATE DATABASE IF NOT EXISTS crs_db;
USE crs_db;

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    course_id BIGINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'REGISTERED',
    CONSTRAINT fk_registration_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Initial Course Seeds (Optional)
INSERT INTO courses (name, duration, description) VALUES
('Full Stack Java Development', '12 Weeks', 'Master Core Java, Spring Boot, Hibernate, REST APIs, and modern React frontend.'),
('Python & Data Science Bootcamp', '10 Weeks', 'Comprehensive data analysis, NumPy, Pandas, machine learning, and dashboard visualization.'),
('Cloud Computing & AWS Architect', '8 Weeks', 'Hands-on AWS services, Docker, Kubernetes, CI/CD pipelines, and cloud security architecture.'),
('MERN Stack Web Development', '12 Weeks', 'Full-stack development with MongoDB, Express.js, React, Node.js, and modern state management.');
