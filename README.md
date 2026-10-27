# Course Registration System (CRS) 🎓

A modern, streamlined web application for a **Training Institute** where students can explore available courses, register their interest, and institute administrators can manage course offerings and student enrollments.

Built with **React.js**, **Java Spring Boot REST API**, and **MySQL Database**.

---

## 🌟 Key Features

1. **Add Courses**:
   - Add new courses specifying **Course Name** and **Duration** (e.g., `12 Weeks`, `3 Months`).
   - Optional description/curriculum summary.
   - Comprehensive input validation on all required fields.

2. **Display Available Courses**:
   - Visual catalog cards showing course names, duration badges with clock icons, and course overviews.
   - Instant search and keyword filter.
   - One-click **"Register Interest"** button that pre-selects the course in the registration form.

3. **Register Student Interest**:
   - Clean registration form requiring:
     - **Student Name** (minimum 2 characters).
     - **Email Address** (thoroughly validated for correct email syntax).
     - **Selected Course** (dropdown populated directly from active backend courses).
   - Real-time client-side validation with helpful error messages.

4. **Confirmation Feedback**:
   - Displays a celebratory confirmation modal upon registration with reference ID (`#CRS-REG-XXX`), student name, email, selected course, and duration.
   - Confetti animation and floating toast alerts.

5. **Display Registrations List**:
   - Table displaying all enrolled students.
   - Shows: Registration ID, Student Name (with avatar badge), Email Address, Chosen Course, Duration, Registration Date & Time, and Status.
   - Live search filter across students, emails, and courses.

6. **Cancel Registration**:
   - Allows registrations to be cancelled.
   - Includes a safe confirmation dialog before cancellation.
   - Instantly updates the database and refreshes the roster with feedback.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Single Page Application with component-based architecture |
| **Icons & UI** | Lucide React | Modern, clean vector iconography |
| **Styling** | Vanilla CSS3 | Custom design system with glassmorphism, responsive grid & dark mode |
| **Backend** | Java 17, Spring Boot 3.3.4 | RESTful Web Services with Spring MVC |
| **ORM / Persistence** | Spring Data JPA / Hibernate | Object-Relational Mapping & automated schema management |
| **Validation** | Jakarta Bean Validation | `@NotBlank`, `@Email`, `@Size`, `@NotNull` annotations |
| **Database** | MySQL 8.0 | Relational database (`crs_db`) with tables for `courses` & `registrations` |

---

## 📂 Project Architecture

```
CRS/
├── backend/
│   ├── pom.xml                                    # Maven configuration & dependencies
│   └── src/
│       └── main/
│           ├── java/com/institute/crs/
│           │   ├── CourseRegistrationSystemApplication.java  # Spring Boot entry point
│           │   ├── config/
│           │   │   ├── CorsConfig.java            # Global CORS configuration
│           │   │   └── DataInitializer.java       # Automatic starter course seeding
│           │   ├── controller/
│           │   │   ├── CourseController.java      # REST endpoints for Courses (/api/courses)
│           │   │   ├── RegistrationController.java# REST endpoints for Registrations (/api/registrations)
│           │   │   └── StatsController.java       # Dashboard statistics endpoint (/api/stats)
│           │   ├── dto/
│           │   │   ├── CourseRequest.java         # Validated DTO for adding courses
│           │   │   └── RegistrationRequest.java   # Validated DTO for registering students
│           │   ├── exception/
│           │   │   ├── GlobalExceptionHandler.java# Centralized REST error handling
│           │   │   ├── ResourceNotFoundException.java
│           │   │   └── DuplicateRegistrationException.java
│           │   ├── model/
│           │   │   ├── Course.java                # JPA Entity for Course
│           │   │   └── Registration.java          # JPA Entity for Registration
│           │   ├── repository/
│           │   │   ├── CourseRepository.java      # Spring Data JPA Repository
│           │   │   └── RegistrationRepository.java# Spring Data JPA Repository
│           │   └── service/
│           │       ├── CourseService.java         # Course business logic
│           │       └── RegistrationService.java   # Registration & cancellation business logic
│           └── resources/
│               ├── application.properties         # MySQL connection & server configuration
│               ├── application-h2.properties      # Lightweight H2 profile fallback
│               └── schema.sql                     # Direct MySQL DDL table script
│
├── frontend/
│   ├── index.html                                 # Web entry page with typography
│   ├── package.json                               # Dependencies & scripts
│   ├── vite.config.js                             # Vite configuration with /api proxy
│   └── src/
│       ├── main.jsx                               # React mount
│       ├── App.jsx                                # Main application controller & state
│       ├── index.css                              # Design system, themes & animations
│       ├── services/
│       │   └── api.js                             # Axios HTTP REST client
│       └── components/
│           ├── Navbar.jsx                         # Top navigation & theme toggle
│           ├── HeroBanner.jsx                     # Hero header with live counts
│           ├── CourseList.jsx                     # Grid of available course cards
│           ├── CourseFormModal.jsx                # "Add Course" dialog with validation
│           ├── RegistrationForm.jsx               # Student registration form
│           ├── RegistrationList.jsx               # Registered students roster table
│           ├── ConfirmationModal.jsx              # Post-registration celebration modal
│           ├── CancelConfirmModal.jsx             # Safety prompt for cancelling registrations
│           └── Toast.jsx                          # Toast notification alerts
└── README.md
```

---

## 🗄️ Database Setup (MySQL)

### Option A: Automatic Creation via Spring Boot (Recommended)
Spring Boot will automatically create the database `crs_db` and all necessary tables upon first startup when connected to MySQL.

Ensure your MySQL server is running on `localhost:3306`. You can set credentials via environment variables or in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crs_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### Option B: Manual SQL Execution
You can also run the provided `schema.sql` file in MySQL Workbench or the MySQL CLI:
```sql
CREATE DATABASE IF NOT EXISTS crs_db;
USE crs_db;

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    course_id BIGINT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'REGISTERED',
    CONSTRAINT fk_registration_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

---

## 🚀 Running the Application Locally

### 1. Prerequisites
- **Java 17+**
- **Apache Maven 3.8+**
- **Node.js 18+ & npm**
- **MySQL 8.0+**

### 2. Start Backend (Spring Boot)
Open a terminal in the `backend/` directory:
```bash
cd backend
mvn spring-boot:run
```
*(Tip: If you want to run with an in-memory/embedded fallback without a local MySQL service, run: `mvn spring-boot:run -Dspring-boot.run.profiles=h2`)*

The REST API will be running at `http://localhost:8080`.

### 3. Start Frontend (React.js)
Open another terminal in the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```

The React web application will be live at `http://localhost:5173`.

---

## 📡 REST API Documentation

### Courses
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/courses` | Retrieve all available courses |
| `GET` | `/api/courses/{id}` | Get course details by ID |
| `POST` | `/api/courses` | Add a new course (`name`, `duration`, `description`) |
| `DELETE` | `/api/courses/{id}` | Remove a course |

### Registrations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/registrations` | Retrieve all student registrations with course info |
| `GET` | `/api/registrations/{id}` | Get registration by ID |
| `POST` | `/api/registrations` | Register a student (`studentName`, `email`, `courseId`) |
| `DELETE` | `/api/registrations/{id}` | Cancel a student registration |

### System Metrics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/stats` | Get live counts of courses, registrations, and system health |

---

## 🔒 Form Validation Rules

1. **Course Creation**:
   - `name`: Required, non-empty, between 2 and 150 characters.
   - `duration`: Required, non-empty (e.g. "12 Weeks", "3 Months").
2. **Student Registration**:
   - `studentName`: Required, non-empty, between 2 and 100 characters.
   - `email`: Required, validated using standard email regex format (`name@domain.tld`).
   - `courseId`: Required, must correspond to a valid active course ID.
   - **Duplicate Prevention**: Prevents duplicate registrations with the same email for the same course.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
