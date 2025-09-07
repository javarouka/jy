import { Loader } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <Loader size={36} className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
