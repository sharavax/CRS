import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type || 'info'}`} role="alert">
          {toast.type === 'success' && <CheckCircle2 size={18} color="var(--success)" />}
          {toast.type === 'error' && <AlertCircle size={18} color="var(--danger)" />}
          {(!toast.type || toast.type === 'info') && <Info size={18} color="var(--primary)" />}

          <span style={{ flex: 1 }}>{toast.message}</span>

          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
