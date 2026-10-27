import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CourseList from './components/CourseList';
import CourseFormModal from './components/CourseFormModal';
import RegistrationForm from './components/RegistrationForm';
import RegistrationList from './components/RegistrationList';
import ConfirmationModal from './components/ConfirmationModal';
import CancelConfirmModal from './components/CancelConfirmModal';
import ToastContainer from './components/Toast';
import apiService from './services/api';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'register' | 'registrations'
  const [selectedCourseForRegister, setSelectedCourseForRegister] = useState(null);

  // Modals & Popups
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [regToCancel, setRegToCancel] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);

  // System states
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  // Fetch initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      setApiError(null);
      const [coursesData, regsData] = await Promise.all([
        apiService.getCourses(),
        apiService.getRegistrations(),
      ]);
      setCourses(coursesData);
      setRegistrations(regsData);
    } catch (err) {
      console.error('Failed to fetch data from backend:', err);
      setApiError(
        'Unable to connect to the backend server at http://localhost:8080. Please ensure the Spring Boot application is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler: Add a Course
  const handleAddCourse = async (coursePayload) => {
    const response = await apiService.addCourse(coursePayload);
    const newCourse = response.data || response;
    setCourses((prev) => [newCourse, ...prev]);
    addToast(`Course "${newCourse.name}" was successfully added!`, 'success');
  };

  // Handler: Delete a Course
  const handleDeleteCourse = async (courseId, courseName) => {
    if (window.confirm(`Are you sure you want to remove the course "${courseName}"? Any associated registrations will also be removed.`)) {
      try {
        await apiService.deleteCourse(courseId);
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
        setRegistrations((prev) => prev.filter((r) => !r.course || r.course.id !== courseId));
        addToast(`Course "${courseName}" deleted.`, 'info');
      } catch (err) {
        addToast('Failed to delete course: ' + (err.response?.data?.message || err.message), 'error');
      }
    }
  };

  // Handler: Select a course to register from Course card
  const handleSelectCourseToRegister = (course) => {
    setSelectedCourseForRegister(course);
    setActiveTab('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Submit student registration
  const handleSubmitRegistration = async (registrationPayload) => {
    const response = await apiService.registerStudent(registrationPayload);
    const savedReg = response.data || response;

    // Prepend to registrations list
    setRegistrations((prev) => [savedReg, ...prev]);

    // Show Confirmation Modal
    setConfirmationData(savedReg);
    addToast(`Registration for ${savedReg.studentName} confirmed!`, 'success');
  };

  // Handler: Confirm Cancel Registration
  const handleConfirmCancelRegistration = async () => {
    if (!regToCancel) return;
    try {
      setIsCancelling(true);
      await apiService.cancelRegistration(regToCancel.id);
      setRegistrations((prev) => prev.filter((r) => r.id !== regToCancel.id));
      addToast(`Registration for ${regToCancel.studentName} was successfully cancelled.`, 'info');
      setRegToCancel(null);
    } catch (err) {
      addToast('Failed to cancel registration: ' + (err.response?.data?.message || err.message), 'error');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        courseCount={courses.length}
        regCount={registrations.length}
      />

      <main className="main-content">
        {/* Backend Connectivity Warning Banner if needed */}
        {apiError && (
          <div
            style={{
              background: 'var(--danger-light)',
              border: '1px solid var(--danger-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle size={20} color="var(--danger)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--danger)', fontWeight: 500 }}>
                {apiError}
              </span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={fetchData}>
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Hero Section (shown on Courses view) */}
        {activeTab === 'courses' && (
          <HeroBanner
            totalCourses={courses.length}
            totalRegistrations={registrations.length}
            onRegisterClick={() => setActiveTab('register')}
            onBrowseClick={() => {
              const el = document.getElementById('courses-heading');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 1: Available Courses */}
        {activeTab === 'courses' && (
          <CourseList
            courses={courses}
            onSelectCourseToRegister={handleSelectCourseToRegister}
            onOpenAddCourse={() => setIsAddCourseModalOpen(true)}
            onDeleteCourse={handleDeleteCourse}
          />
        )}

        {/* Tab 2: Register Interest */}
        {activeTab === 'register' && (
          <RegistrationForm
            courses={courses}
            selectedCourse={selectedCourseForRegister}
            onSubmitRegistration={handleSubmitRegistration}
            onGoToCourses={() => setActiveTab('courses')}
          />
        )}

        {/* Tab 3: Registrations List */}
        {activeTab === 'registrations' && (
          <RegistrationList
            registrations={registrations}
            onCancelRegistration={(reg) => setRegToCancel(reg)}
            onGoToRegister={() => setActiveTab('register')}
          />
        )}
      </main>

      {/* Add Course Modal */}
      <CourseFormModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAddCourse={handleAddCourse}
      />

      {/* Registration Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmationData}
        onClose={() => setConfirmationData(null)}
        registrationData={confirmationData}
        onViewRegistrations={() => {
          setActiveTab('registrations');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Cancel Confirmation Dialog */}
      <CancelConfirmModal
        isOpen={!!regToCancel}
        onClose={() => setRegToCancel(null)}
        onConfirm={handleConfirmCancelRegistration}
        registration={regToCancel}
        isCancelling={isCancelling}
      />

      {/* Toast Alert System */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer className="app-footer">
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>EduPulse Training Institute</strong> &copy; {new Date().getFullYear()} &mdash; Course Registration System (CRS)
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Backend: Java Spring Boot REST API</span>
            <span>Database: MySQL</span>
            <span>Frontend: React.js</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
