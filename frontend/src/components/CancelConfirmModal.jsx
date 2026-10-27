import React from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

export default function CancelConfirmModal({ isOpen, onClose, onConfirm, registration, isCancelling }) {
  if (!isOpen || !registration) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--danger-light)',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AlertTriangle size={20} />
            </div>
            <h3>Cancel Registration</h3>
          </div>
          <button className="btn btn-secondary btn-icon btn-sm" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-main)', fontSize: '0.9375rem', lineHeight: 1.5, marginBottom: '1rem' }}>
            Are you sure you want to cancel the registration for:
          </p>
          <div
            style={{
              background: 'var(--bg-page)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem 1rem',
              marginBottom: '1rem',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{registration.studentName}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{registration.email}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', marginTop: '0.25rem', fontWeight: 600 }}>
              Course: {registration.course ? registration.course.name : 'Unknown'}
            </div>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--danger)', fontWeight: 500 }}>
            This action will remove the student from the course roster immediately.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isCancelling}>
            Keep Registration
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            id="btn-confirm-cancel-registration"
            disabled={isCancelling}
          >
            <Trash2 size={16} />
            <span>{isCancelling ? 'Cancelling...' : 'Yes, Cancel Registration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
