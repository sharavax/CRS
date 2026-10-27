import React from 'react';
import { Sparkles, ArrowRight, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export default function HeroBanner({ totalCourses, totalRegistrations, onRegisterClick, onBrowseClick }) {
  return (
    <div className="hero-section">
      <div className="hero-glow"></div>
      <div className="hero-content">
        <div className="hero-tag">
          <Sparkles size={14} />
          <span>Professional Career Development</span>
        </div>
        <h2 className="hero-title">
          Upskill Your Future With Industry-Leading Courses
        </h2>
        <p className="hero-subtitle">
          Explore comprehensive technology & business cohorts designed by industry leaders. Register your interest today and take the next step in your career journey.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button className="btn btn-primary" onClick={onRegisterClick} style={{ background: '#ffffff', color: '#4f46e5', fontWeight: 700 }}>
            <span>Register Interest Now</span>
            <ArrowRight size={16} />
          </button>
          <button className="btn btn-secondary" onClick={onBrowseClick} style={{ background: 'rgba(255,255,255,0.12)', color: '#ffffff', borderColor: 'rgba(255,255,255,0.25)' }}>
            <span>Explore Courses</span>
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-value">{totalCourses}</span>
            <span className="stat-label">Available Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{totalRegistrations}</span>
            <span className="stat-label">Student Registrations</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">100%</span>
            <span className="stat-label">Verified Certifications</span>
          </div>
        </div>
      </div>
    </div>
  );
}
