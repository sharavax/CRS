import React, { useState } from 'react';
import { X, BookOpen, Clock, AlignLeft, AlertCircle } from 'lucide-react';

export default function CourseFormModal({ isOpen, onClose, onAddCourse }) {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Course name must be at least 3 characters';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Course duration is required (e.g. 12 Weeks, 3 Months)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onAddCourse({
        name: formData.name.trim(),
        duration: formData.duration.trim(),
        description: formData.description.trim(),
      });
      // reset
      setFormData({ name: '', duration: '', description: '' });
      setErrors({});
      onClose();
    } catch (err) {
      setErrors({ form: err.response?.data?.message || err.message || 'Failed to add course.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="course-icon-badge" style={{ width: '38px', height: '38px' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <h3>Add New Course</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Introduce a new course curriculum with name and duration
              </p>
            </div>
          </div>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.form && (
              <div className="form-error" style={{ marginBottom: '1rem', padding: '0.75rem', background: 'var(--danger-light)', borderRadius: 'var(--radius-sm)' }}>
                <AlertCircle size={16} />
                <span>{errors.form}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="course-name">
                Course Name <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <BookOpen size={16} className="input-icon" />
                <input
                  id="course-name"
                  type="text"
                  className={`form-input ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="e.g. Full Stack Java Development"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  autoFocus
                />
              </div>
              {errors.name && (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="course-duration">
                Course Duration <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <Clock size={16} className="input-icon" />
                <input
                  id="course-duration"
                  type="text"
                  className={`form-input ${errors.duration ? 'is-invalid' : ''}`}
                  placeholder="e.g. 12 Weeks, 3 Months, or 60 Hours"
                  value={formData.duration}
                  onChange={(e) => {
                    setFormData({ ...formData, duration: e.target.value });
                    if (errors.duration) setErrors({ ...errors, duration: null });
                  }}
                />
              </div>
              {errors.duration ? (
                <div className="form-error">
                  <AlertCircle size={14} />
                  <span>{errors.duration}</span>
                </div>
              ) : (
                <p className="form-hint">Specify the duration or estimated completion timeframe.</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="course-description">
                Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
              </label>
              <textarea
                id="course-description"
                rows="3"
                className="form-textarea"
                placeholder="Brief summary of syllabus, target audience, or technologies covered..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="btn-submit-course" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
