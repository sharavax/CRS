import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, X, ClipboardList, ArrowRight, UserCheck, Calendar, BookOpen, Clock, Mail, User } from 'lucide-react';

export default function ConfirmationModal({ isOpen, onClose, registrationData, onViewRegistrations }) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // gracefully ignore if confetti fails
      }
    }
  }, [isOpen]);

  if (!isOpen || !registrationData) return null;

  const reg = registrationData;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-body" style={{ textAlign: 'center', paddingTop: '2.5rem' }}>
          <div className="success-check-wrapper">
            <CheckCircle2 size={38} strokeWidth={2.5} />
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Registration Successful!
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.5 }}>
            Thank you, <strong>{reg.studentName}</strong>! Your interest in the training cohort has been officially recorded in the institute database.
          </p>

          <div className="confirmation-card">
            <div className="conf-row">
              <span className="label">Registration ID:</span>
              <span className="value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                #CRS-REG-{reg.id}
              </span>
            </div>
            <div className="conf-row">
              <span className="label">Student Name:</span>
              <span className="value">{reg.studentName}</span>
            </div>
            <div className="conf-row">
              <span className="label">Email:</span>
              <span className="value">{reg.email}</span>
            </div>
            <div className="conf-row">
              <span className="label">Enrolled Course:</span>
              <span className="value">{reg.course ? reg.course.name : '—'}</span>
            </div>
            <div className="conf-row">
              <span className="label">Duration:</span>
              <span className="value">{reg.course ? reg.course.duration : '—'}</span>
            </div>
            <div className="conf-row" style={{ borderTop: '1px dashed var(--primary-border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
              <span className="label">Status:</span>
              <span className="status-badge registered" style={{ fontSize: '0.75rem' }}>
                <span className="status-dot"></span>
                <span>CONFIRMED</span>
              </span>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Register Another
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onClose();
              if (onViewRegistrations) onViewRegistrations();
            }}
          >
            <ClipboardList size={16} />
            <span>View Registrations</span>
          </button>
        </div>
      </div>
    </div>
  );
}
