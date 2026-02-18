import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import type { Toast as ToastType } from '../../../context/ToastContext.types';

interface ToastProps {
  toast: ToastType;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  const { message, type, duration = 3000 } = toast;

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircleIcon fontSize="small" />,
    error: <ErrorIcon fontSize="small" />,
    warning: <WarningIcon fontSize="small" />,
    info: <InfoIcon fontSize="small" />,
  };

  const titles = {
    success: 'Éxito',
    error: 'Error',
    warning: 'Advertencia',
    info: 'Información',
  };

  return (
    <div 
      className={`toast toast--${type}`} 
      role="alert" 
      aria-live="polite"
    >
      <div className="toast__icon">{icons[type]}</div>
      <div className="toast__content">
        <div className="toast__title">{titles[type]}</div>
        <div className="toast__message">{message}</div>
      </div>
      <button 
        className="toast__close" 
        onClick={onClose}
        aria-label="Cerrar notificación"
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
};

export default Toast;
