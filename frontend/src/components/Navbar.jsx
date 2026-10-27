import React from 'react';
import { GraduationCap, BookOpen, UserPlus, ClipboardList, Plus, Sun, Moon } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAddCourse, darkMode, setDarkMode, courseCount, regCount }) {
  return (
    <header className="navbar">
      <div className="nav-content">
        <div className="brand" onClick={() => setActiveTab('courses')} role="button" tabIndex={0}>
          <div className="brand-icon-wrapper">
            <GraduationCap size={26} strokeWidth={2.2} />
          </div>
          <div className="brand-info">
            <h1>EduPulse Institute</h1>
            <p>Course Registration & Enrollment Portal</p>
          </div>
        </div>

        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
            id="tab-courses"
          >
            <BookOpen size={17} />
            <span>Available Courses</span>
            {courseCount > 0 && <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({courseCount})</span>}
          </button>

          <button
            className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
            id="tab-register"
          >
            <UserPlus size={17} />
            <span>Register Interest</span>
          </button>

          <button
            className={`nav-tab ${activeTab === 'registrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('registrations')}
            id="tab-registrations"
          >
            <ClipboardList size={17} />
            <span>Registrations</span>
            {regCount > 0 && <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>({regCount})</span>}
          </button>
        </nav>

        <div className="nav-actions">
          <button
            className="btn btn-secondary btn-icon"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
            className="btn btn-primary"
            onClick={onOpenAddCourse}
            id="btn-add-course"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Add Course</span>
          </button>
        </div>
      </div>
    </header>
  );
}
