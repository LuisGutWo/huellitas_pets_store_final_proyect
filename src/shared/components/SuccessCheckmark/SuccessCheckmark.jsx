import React from "react";
import "./successCheckmark.scss";

/**
 * SuccessCheckmark Component
 * Displays animated checkmark with optional message
 *
 * Props:
 * - message: string (optional) - Message to display below checkmark
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - duration: 'fast' | 'normal' | 'slow' (default: 'normal')
 */

const SuccessCheckmark = ({ message, size = "md", duration = "normal" }) => {
  return (
    <div
      className={`success-checkmark success-checkmark-${size} success-duration-${duration}`}
    >
      <div className="checkmark-circle">
        <svg
          className="checkmark-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle-svg"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default SuccessCheckmark;
