import React, { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Clock, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function RegistrationForm({ courses, selectedCourse, onSubmitRegistration, onGoToCourses }) {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    courseId: selectedCourse ? selectedCourse.id : (courses.length > 0 ? courses[0].id : ''),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, courseId: selectedCourse.id }));
    } else if (courses.length > 0 && !formData.courseId) {
      setFormData((prev) => ({ ...prev, courseId: courses[0].id }));
    }
  }, [selectedCourse, courses]);

  // Robust email validation check
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(String(email).trim());
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required.';
    } else if (formData.studentName.trim().length < 2) {
      newErrors.studentName = 'Student name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., student@domain.com).';
    }

    if (!formData.courseId) {
      newErrors.courseId = 'Please select a course.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ studentName: true, email: true, courseId: true });

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmitRegistration({
        studentName: formData.studentName.trim(),
        email: formData.email.trim(),
        courseId: Number(formData.courseId),
      });

      // Reset form after successful submission
      setFormData({
        studentName: '',
        email: '',
        courseId: courses.length > 0 ? courses[0].id : '',
      });
      setTouched({});
      setErrors({});
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      setErrors((prev) => ({ ...prev, form: serverMsg || 'Registration failed. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const chosenCourseObj = courses.find((c) => String(c.id) === String(formData.courseId));

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '2rem' }}>
        <div>
          <h2>
            <User size={24} color="var(--primary)" />
            Student Course Registration
          </h2>
          <p>Register your interest in a training course. Our admissions team will review and confirm your slot.</p>
        </div>
      </div>

      <div className="form-card">
        {errors.form && (
          <div
            className="form-error"
            style={{
              padding: '1rem',
              background: 'var(--danger-light)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--danger-border)',
              marginBottom: '1.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{errors.form}</span>
          </div>
        )}

        {courses.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem 1rem' }}>
            <AlertCircle size={36} color="var(--warning)" style={{ marginBottom: '0.75rem' }} />
            <h3>No Courses Available Yet</h3>
            <p>Please add at least one course first before registering students.</p>
            <button className="btn btn-primary" onClick={onGoToCourses}>
              View Available Courses
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Student Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-name">
                Full Name <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <User size={17} className="input-icon" />
                <input
                  id="student-name"
                  type="text"
                  className={`form-input ${touched.studentName && errors.studentName ? 'is-invalid' : ''}`}
                  placeholder="e.g. John Doe"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  onBlur={() => handleBlur('studentName')}
                  required
                />
              </div>
              {touched.studentName && errors.studentName && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.studentName}</span>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label className="form-label" htmlFor="student-email">
                Email Address <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <Mail size={17} className="input-icon" />
                <input
                  id="student-email"
                  type="email"
                  className={`form-input ${touched.email && errors.email ? 'is-invalid' : ''}`}
                  placeholder="e.g. john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onBlur={() => handleBlur('email')}
                  required
                />
              </div>
              {touched.email && errors.email ? (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              ) : (
                <p className="form-hint">Confirmation and syllabus will be emailed to this address.</p>
              )}
            </div>

            {/* Select Course */}
            <div className="form-group">
              <label className="form-label" htmlFor="course-select">
                Selected Course <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <BookOpen size={17} className="input-icon" />
                <select
                  id="course-select"
                  className={`form-select ${touched.courseId && errors.courseId ? 'is-invalid' : ''}`}
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  onBlur={() => handleBlur('courseId')}
                  required
                >
                  <option value="" disabled>-- Select a Course --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>
              {touched.courseId && errors.courseId && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.courseId}</span>
                </div>
              )}
            </div>

            {/* Selected Course Preview Summary Card */}
            {chosenCourseObj && (
              <div
                style={{
                  background: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Selected Program
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                    {chosenCourseObj.name}
                  </div>
                </div>
                <div className="duration-pill" style={{ background: '#ffffff' }}>
                  <Clock size={13} />
                  <span>{chosenCourseObj.duration}</span>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                id="btn-submit-registration"
                style={{ flex: 1, padding: '0.875rem 1.5rem', fontSize: '1rem' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting Registration...</span>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Register My Interest</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
