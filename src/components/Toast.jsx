import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="toast-notification" role="status" aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;