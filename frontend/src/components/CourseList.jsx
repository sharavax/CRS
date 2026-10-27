import React, { useState } from 'react';
import { Clock, BookOpen, Search, UserCheck, Plus, Trash2, Calendar } from 'lucide-react';

export default function CourseList({ courses, onSelectCourseToRegister, onOpenAddCourse, onDeleteCourse }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section aria-labelledby="courses-heading">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 id="courses-heading">
            <BookOpen size={24} color="var(--primary)" />
            Available Courses
          </h2>
          <p>Choose from our specialized programs designed for modern industry requirements.</p>
        </div>

        <div className="section-actions">
          <div className="input-wrapper" style={{ minWidth: '240px' }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search courses or duration..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search courses"
            />
          </div>

          <button className="btn btn-primary" onClick={onOpenAddCourse}>
            <Plus size={16} />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <BookOpen size={32} />
          </div>
          <h3>No Courses Found</h3>
          <p>
            {searchTerm
              ? `No courses matching "${searchTerm}". Try a different keyword.`
              : 'There are currently no courses registered in the system. Add your first course to get started!'}
          </p>
          <button className="btn btn-primary" onClick={onOpenAddCourse}>
            <Plus size={16} />
            <span>Add Course Now</span>
          </button>
        </div>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="course-card-top">
                <div className="course-icon-badge">
                  <BookOpen size={24} />
                </div>
                <div className="duration-pill">
                  <Clock size={13} />
                  <span>{course.duration}</span>
                </div>
              </div>

              <h3 className="course-title">{course.name}</h3>
              <p className="course-desc">
                {course.description || 'Comprehensive training curriculum with hands-on labs, guided mentoring, and practical capstone projects.'}
              </p>

              <div className="course-card-bottom">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onSelectCourseToRegister(course)}
                  id={`btn-register-course-${course.id}`}
                  style={{ width: '100%' }}
                >
                  <UserCheck size={15} />
                  <span>Register Interest</span>
                </button>

                {onDeleteCourse && (
                  <button
                    className="btn btn-danger btn-icon btn-sm"
                    onClick={() => onDeleteCourse(course.id, course.name)}
                    title="Delete course"
                    aria-label={`Delete course ${course.name}`}
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
