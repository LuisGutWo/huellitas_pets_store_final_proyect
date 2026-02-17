import Toast from './Toast';
import { useToast } from '../../../context/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div 
      className="toast-container" 
      aria-live="polite" 
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
};

export default ToastContainer;
