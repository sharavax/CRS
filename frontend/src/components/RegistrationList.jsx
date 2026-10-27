import React, { useState } from 'react';
import { ClipboardList, Search, Trash2, Calendar, Mail, User, BookOpen, Clock, AlertTriangle } from 'lucide-react';

export default function RegistrationList({ registrations, onCancelRegistration, onGoToRegister }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = registrations.filter((r) => {
    const student = r.studentName ? r.studentName.toLowerCase() : '';
    const email = r.email ? r.email.toLowerCase() : '';
    const course = r.course && r.course.name ? r.course.name.toLowerCase() : '';
    const query = searchTerm.toLowerCase();
    return student.includes(query) || email.includes(query) || course.includes(query);
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section aria-labelledby="registrations-heading">
      <div className="section-header">
        <div className="section-title-wrap">
          <h2 id="registrations-heading">
            <ClipboardList size={24} color="var(--primary)" />
            Student Registrations
          </h2>
          <p>Complete roster of registered students, enrolled courses, and enrollment statuses.</p>
        </div>

        <div className="section-actions">
          <div className="input-wrapper" style={{ minWidth: '260px' }}>
            <Search size={16} className="input-icon" />
            <input
              type="text"
              className="form-input"
              placeholder="Search by student, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search registrations"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <ClipboardList size={32} />
          </div>
          <h3>No Registrations Found</h3>
          <p>
            {searchTerm
              ? `No registrations matching "${searchTerm}". Try searching for another name or course.`
              : 'No students have registered their interest yet.'}
          </p>
          <button className="btn btn-primary" onClick={onGoToRegister}>
            <span>Register a Student Now</span>
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table" aria-label="Registrations Table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Chosen Course</th>
                <th scope="col">Duration</th>
                <th scope="col">Registered Date</th>
                <th scope="col">Status</th>
                <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={reg.id} id={`registration-row-${reg.id}`}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-muted)' }}>
                    #{reg.id}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--primary-light)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.8125rem',
                        }}
                      >
                        {reg.studentName ? reg.studentName.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <span style={{ fontWeight: 600 }}>{reg.studentName}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <Mail size={14} style={{ opacity: 0.7 }} />
                      <span>{reg.email}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {reg.course ? reg.course.name : 'Unknown Course'}
                    </span>
                  </td>
                  <td>
                    {reg.course && reg.course.duration ? (
                      <span className="duration-pill" style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem' }}>
                        <Clock size={11} />
                        <span>{reg.course.duration}</span>
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {formatDate(reg.registrationDate)}
                  </td>
                  <td>
                    <span className="status-badge registered">
                      <span className="status-dot"></span>
                      <span>{reg.status || 'REGISTERED'}</span>
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onCancelRegistration(reg)}
                      id={`btn-cancel-reg-${reg.id}`}
                      title="Cancel this student registration"
                    >
                      <Trash2 size={14} />
                      <span>Cancel</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
